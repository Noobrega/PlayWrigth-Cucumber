import { error } from "console"
import { Names } from "../test-data/Names.js"
import { Surames } from "../test-data/Surnames.js"
import { paths } from "./paths.js";
import path from "path";
import * as fs from 'fs';

/**
     * Resolves the locator: if a string is provided, converts it using page.locator.
     * If already a Locator, returns it directly.
     * @param {import('@playwright/test').Page} page - The Playwright page object.
     * @param {string|import('@playwright/test').Locator} selectorOrLocator - A string selector or a Locator object.
     * @returns {import('@playwright/test').Locator} The resolved Locator.
     */
function resolveLocator(page, selectorOrLocator) {
    if (typeof selectorOrLocator === 'object' && typeof selectorOrLocator.click === 'function') {
        return selectorOrLocator
    }
    return page.locator(selectorOrLocator)
}

export class Comands {

    GetStringDate(MoreDays = 0) {
        const now = new Date()
        if (MoreDays > 0) {
            now.setDate(now.getDate() + MoreDays)
        }
        const options = { month: 'short', day: 'numeric', year: 'numeric' }
        return now.toLocaleDateString('en-US', options)
    }

    RandomDigits(digits = 1) {
        const fdigit = Math.floor(Math.random() * 9) + 1
        let rdigits = ''
        for (let i = 1; i < digits; i++) {
            rdigits += Math.floor(Math.random() * 10)
        }
        return parseInt(fdigit + rdigits, 10)
    }

    GetTime(Hours = 0, Minutes = 0) {
        const now = new Date()
        now.setHours(now.getHours() + Hours - 2, now.getMinutes() + Minutes)
        const hours = now.getHours() % 12 || 12
        const minutes = String(now.getMinutes()).padStart(2, '0')
        const amPM = now.getHours() >= 0 ? 'PM' : 'AM'
        return `${hours}:${minutes} ${amPM}`.toString()
    }

    RandomName(surnames = 3) {
        let length = Math.floor(Math.random() * Names.length)
        let name = Names[length]
        let surname = []
        for (let i = 0; i < surnames; i++) {
            let partial_surname
            do {
                length = Math.floor(Math.random() * Surames.length)
                partial_surname = Surames[length]
            } while (surname.includes(partial_surname)) // Ensure no duplicate surnames
            surname.push(partial_surname)
            name += ` ${partial_surname}`
        }
        //console.log(`Generated Name: ${name}`)
        return name
    }

    EmailGenerator(name) {
        name = name.toLowerCase()
        const Names = name.split(' ')
        let email = ""
        for (let i = 0; i < Names.length; i++) {
            email += `${Names[i].slice(0, 3)}_`// set the name to 3 characters to fit the email
            if (Names[i].length < 3) {
                throw new Error(`The name ${Names[i]} is too short. It needs to be at least 3 characters.`)
            }
        }
        email = `${email.slice(0, -1)}@justworks.com`
        //console.log(`Generated Email: ${email}`)
        return email
    }

    ULIDGenerator(StartWith = "company_01", length = 34) {
        const characters = "abcdefghijklmnopqrstuvwxyz012345789"
        if (!(StartWith.length < length))
            throw error(`The length need's to be more than ${StartWith.length}`)
        let UILD = StartWith
        for (let i = 0; i < (length - StartWith.length); i++) {
            const RandomLetter = Math.floor(Math.random() * characters.length)
            UILD += characters[RandomLetter]
        }
        return UILD
    }

    waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });

            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    DataPath(file) {
        const FullPath = path.join(paths.filesDir, file)
        if (!fs.existsSync(FullPath)) {
            throw new Error(`The file doesn't exists on Files Folder: ${DataPath}`)
        }
        return FullPath
    }

    async visit(page, url) {
        this.page = page
        await Promise.all([this.page.goto(url), this.waitLoadPage(this.page, url)])
    }

    async waitLoadPage(page, url) {
        this.page = page
        await this.page.waitForURL(url)
    }

    async Wait(page, Milliseconds) {
        this.page = page
        await this.page.waitForTimeout(Milliseconds)
    }

    async Refresh(page, url) {
        this.page = page
        this.Wait(this.page, 1500)
        await Promise.all([this.page.goto(url), this.page.waitForURL(url)])
    }

    async PrintPage(page, name) {
        const PictureName = name.replace(/ /g, '_')
        const ScreenshotPath = `${paths.screenshotsDir}${PictureName}_print.png`
        this.page = page
        try {
            if (this.page) {
                console.log('--------------------Screenshot--------------------')
                await this.page.screenshot({ path: ScreenshotPath, fullpage: true })
                console.log(ScreenshotPath)
                console.log('--------------------------------------------------')
            }
        } catch (error) {
            console.log('Error to take screenshot: ', error.message)
        }
    }

    /**
    * Waits for the element to be visible, then returns the Locator.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {number} [timeout=30000] - Timeout in milliseconds
    * @returns {Promise<import('@playwright/test').Locator>}
    * @example const locator = await elements.waitElementBeVisible(page, '#submit')
    */
    async waitElementBeVisible(page, selectorOrLocator, State = 'visible', timeout = 30000) {
        const locator = resolveLocator(page, selectorOrLocator)
        await locator.waitFor({ state: State, timeout })
        return locator
    }
}