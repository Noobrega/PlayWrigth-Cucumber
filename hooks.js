import { Before, After, AfterAll, setDefaultTimeout, BeforeAll } from "@cucumber/cucumber";
import { chromium } from 'playwright';
import { paths } from "./e2e/Common/paths.js";
import * as fs from 'fs';
import path from "path";


let TestResults = []
const RunTime = 180_000
const ActionTime = 40_000
const Width = 1280
const Height = 720

setDefaultTimeout(180_000);

BeforeAll(function () {
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
        headless: true

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
        const steps = scenario.pickle.steps.map(step => step.text)
        const WorkerID = `${process.env.CUCUMBER_WORKER_ID}`
        const Details = { Name, Email, ULID, CID, URL, steps}
        TestResults.push({ TestName, Status, WorkerID, Details })
        try {
            if (this.page.video()) {
                const VideoPath = await this.page.video().path()
                const TSName = TestName.replace(/[^a-zA-Z0-9-_]/g, '_')
                const NewVideoPath = path.join(paths.dataVideosDir, `${TSName}.webm`)
                fs.renameSync(VideoPath, NewVideoPath)
            }
        } catch (error) {
            console.log('Error when tried rename the video: ', error.message)
        }
        if (Status === 'FAILED') {
            const ScenarioName = TestName.replace(/ /g, '_')
            const ScreenshotPath = path.join(paths.screenshotsDir, `${ScenarioName}_failed.png`)
            try {
                if (this.page) {
                    await this.page.screenshot({ path: ScreenshotPath, fullpage: true })
                    console.log(`Screenshot saved: ${ScenarioName}`)
                }
            } catch (error) {
                console.log('Error to take screenshot: ', error.message)
            }
        }
        if (this.page) {
            await this.page.close()
            await this.context.close()
            await this.browser.close()
        }
    } catch (error) {
        console.log('Error to close browser: ', error.message)
    }
})

AfterAll(function () {
    SaveJsonFile('run info', TestResults)
})

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