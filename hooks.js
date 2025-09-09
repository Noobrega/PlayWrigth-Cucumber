import { Before, After, AfterAll, setDefaultTimeout, BeforeAll } from "@cucumber/cucumber"
import { chromium } from 'playwright'
import { paths } from "./e2e/Common/paths"
import * as fs from 'fs'
import path from "path"


let TestResults = []
const RunTime = 180_000
const ActionTime = 40_000
const Width = 1280
const Height = 720

setDefaultTimeout(180_000)

BeforeAll(function () {
    // console.log('---------------------------------- HOOKS ----------------------------------')
    // console.log('ls e2e/Tests/Features:', fs.readdirSync('e2e/Tests/Features').join('\n'))
    // console.log('steps exists?', fs.existsSync('e2e/Tests/Steps/Steps.mjs'))
    // console.log('env:', process.env.ENV || 'not defined')
    // console.log(`Running with CUCUMBER_WORKER_ID=${process.env.CUCUMBER_WORKER_ID || 'not defined'}`)
    // console.log('---------------------------------- HOOKS ----------------------------------')
    if (process.env.CUCUMBER_WORKER_ID == 0) {
        CleanFolder(paths.LLastRunDir)
        MoveFiles(paths.LastRunDir, paths.LLastRunDir)
        CleanFolder(paths.LastRunDir)
        MoveFiles(paths.screenshotsDir, paths.LastRunDir + "/screenshots/")
        MoveFiles(paths.reportsDir, paths.LastRunDir + "/test_summary/")
        MoveFiles(paths.dataDir, paths.LastRunDir + "/data/")
        CleanFolder(paths.screenshotsDir)
        CleanFolder(paths.dataVideosDir)
    }
    
})

Before(async function () {
    this.browser = await chromium.launch({
        //slowMo: 1000,
        headless: false

    })
    this.context = await this.browser.newContext({
        viewport: { width: Width, height: Height },
        actionTimeout: ActionTime,
        navigationTimeout: RunTime,
        recordVideo: {
            dir: paths.dataVideosDir,
            size: {
                width: Width,
                height: Height
            }
        },
        permissions: []
    })
    this.page = await this.context.newPage()
})

After(async function (scenario) {
    try {
        const TestName = OneNameRun(scenario.pickle.name, TestResults)
        const Status = scenario.result.status.toUpperCase()
        const Name = this.DataName
        const Email = this.DataEmail
        const ULID = this.CanodicalULID
        const URL = this.AccountURL
        const CID = "C" + this.CompID
        const steps = scenario.pickle.steps.map(s => s.text)
        const WorkerID = String(process.env.CUCUMBER_WORKER_ID ?? '')
        const Details = { Name, Email, ULID, CID, URL, steps }

        TestResults.push({ TestName, Status, WorkerID, Details })

        // --- handle video safely ---
        const video = this.page?.video(); // capture the handle before closing the page

        // Take screenshot on failure (before closing so the page is alive)
        if (Status === 'FAILED') {
            try {
                const scenarioSafe = TestName.replace(/[^a-zA-Z0-9-_]/g, '_')
                const screenshotPath = path.join(paths.screenshotsDir, `${scenarioSafe}_failed.png`)
                ensureDir(paths.screenshotsDir)
                await this.page.screenshot({ path: screenshotPath, fullPage: true })
                //console.log(`[INFO] Screenshot saved: ${screenshotPath}`)
            } catch (err) {
                console.log('[WARN] Failed to take screenshot:', err.message)
            }
        }

        // Close page/context/browser to finalize the video file
        if (this.page) await this.page.close()
        if (this.context) await this.context.close(); // <— this flushes the video to disk
        if (this.browser) await this.browser.close()

        // ---- SAVE VIDEO (robust + forced cleanup on Windows) ----
        if (video) {
            try {
                ensureDir(paths.dataVideosDir)

                const safeBase = TestName.replace(/[^a-zA-Z0-9-_]/g, '_')
                const suffix = process.env.CUCUMBER_WORKER_ID ? `Worker_${process.env.CUCUMBER_WORKER_ID}_` : ''
                const destPath = path.join(paths.dataVideosDir, `${suffix}${safeBase}.webm`)

                // 1) caminho temporário gerenciado pelo Playwright
                const tmpPath = await retry(() => video.path(), 10, 200)

                // 2) copia para o nome final (mais estável que rename em NTFS)
                await retry(() => fs.promises.copyFile(tmpPath, destPath), 10, 200)

                // 3) tenta deletar via API do Playwright
                await video.delete().catch(() => { })

                // 4) garantia extra: se o temporário ainda existe, remove manualmente
                try {
                    await retry(async () => {
                        if (fs.existsSync(tmpPath)) {
                            await fs.promises.unlink(tmpPath)
                        }
                    }, 5, 200)
                } catch (_) {
                    // último fallback: log apenas (não falha o teste)
                    console.warn('[WARN] Could not unlink temp video:', tmpPath)
                }

                console.log('[INFO] Video saved:', destPath)
            } catch (err) {
                console.error('[WARN] Failed to save video:', err?.stack || err)
            }
        }
    } catch (error) {
        console.log('[ERROR] After hook failed:', error.message)
        // best effort close if something stayed open
        try { if (this.page) await this.page.close(); } catch { }
        try { if (this.context) await this.context.close(); } catch { }
        try { if (this.browser) await this.browser.close(); } catch { }
    }
})

AfterAll(function () {
    SaveJsonFile('run info', TestResults)
})

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function retry(fn, tries = 10, delayMs = 200) {
    let lastErr
    for (let i = 0; i < tries; i++) {
        try { return await fn(); }
        catch (e) { lastErr = e; await sleep(delayMs); }
    }
    throw lastErr
}

function SaveJsonFile(NameFile, Data) {
    NameFile = NameFile.replace(/ /g, '_')
    const DataJsonPath = path.join(paths.dataDir, `${NameFile}.json`)
    const Dir = path.resolve(DataJsonPath)

    let existingData = []
    let finalData = []

    // Check if the file already exists
    if (fs.existsSync(Dir)) {
        try {
            // Read the current content of the file
            const fileContent = fs.readFileSync(Dir, 'utf-8')
            existingData = JSON.parse(fileContent); // Convert the content to JSON
        } catch (error) {
            console.error('Error reading the existing JSON file:', error.message)
        }
    }

    // Add the new data to the existing content
    if (Array.isArray(existingData)) {
        finalData = existingData.concat(Data) // Add the new data to the existing array
    } else {
        console.warn('The existing JSON file is not an array. Replacing the content.')
        finalData = [Data]; // Replace the content with an array containing the new data
    }

    // Save the updated file
    try {
        fs.writeFileSync(Dir, JSON.stringify(finalData, null, 2), 'utf-8')
        console.log(`Data saved to file: ${Dir}`)
    } catch (error) {
        console.error('Error saving the JSON file:', error.message)
    }
}

function MoveFiles(OriginDir, DestinyDir) {
    if (!fs.existsSync(DestinyDir)) {
        fs.mkdirSync(DestinyDir, { recursive: true })
    }
    if (!fs.existsSync(OriginDir)) {
        fs.mkdirSync(OriginDir, { recursive: true })
    }
    const files = fs.readdirSync(OriginDir)
    files.forEach((file) => {
        let PathOrigin = path.join(OriginDir, file)
        let PathDestiny = path.join(DestinyDir, file)
        if (OriginDir == paths.reportsDir) {
            PathOrigin = path.join(OriginDir, file)
            PathDestiny = path.join(DestinyDir, "report.html")
        }
        try {
            if (OriginDir == paths.reportsDir) {
                fs.copyFileSync(PathOrigin, PathDestiny)
            } else {
                fs.renameSync(PathOrigin, PathDestiny)
            }
        } catch (error) {
            console.error(`Error to move the file:`, error.message)
        }
    })
}

function OneNameRun(Name, List) {
    let Run = 1
    let newName = Name
    while (List.some(item => item.TestName === newName)) {
        Run++
        const sufix = ` Run ${String(Run).padStart(2, '0')}`
        newName = Name + sufix
    }
    return (newName)
}

function CleanFolder(Folder) {
    if (!fs.existsSync(Folder)) {
        fs.mkdirSync(Folder, { recursive: true })
    }
    fs.readdirSync(Folder).forEach((file) => {
        const filepath = path.join(Folder, file)
        fs.rmSync(filepath, { recursive: true, force: true })
    })
}