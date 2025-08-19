import { Comands } from "../Common/Comands.js"
import { paths } from "../Common/paths.js"
import Elements from "../Common/Elements.js"
import IFrame from "../Common/iFrame.js"

export class Base {
    constructor(page, url = process.env.baseUrl) {
        // Page Area
        this.page = page
        // URL Area
        this.url = url
        // Param area
        this.Comands = new Comands()
        this.Elements = new Elements()
        this.iFrame = new IFrame()
        // Locators Area
        this.locators = {

        }
    }

    async visit() {
        await Promise.all([this.page.goto(this.url), this.waitLoadPage()])
    }

    async waitLoadPage() {
        await this.page.waitForURL(this.url)
    }
}