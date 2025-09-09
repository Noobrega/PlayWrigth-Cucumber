import { Comands } from "../Common/Comands.js"
import { paths } from "../Common/Paths.js"
import Elements from "../Common/Elements.js"
import IFrame from "../Common/iFrame.js"
import * as fs from 'fs'

export class DashboardPage {
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
            "Dashboard Header": this.page.getByRole('heading', { name: 'Dashboard' }),
            "Menu Dashboard": this.page.getByLabel('Sidepanel').locator('div').filter({ hasText: 'AdminPIMLeaveTimeRecruitmentMy' }),
        }
    }

    async isDashboardVisible() {
        return await this.Elements.isVisible(this.page, this.locators["Dashboard Header"])
    }

    async isProfileMenuVisible() {
        return await this.Elements.isVisible(this.page, this.locators["Menu Dashboard"])
    }

    async visit() {
        await Promise.all([this.page.goto(this.url), this.waitLoadPage()])
    }

    async waitLoadPage() {
        await this.page.waitForURL(this.url)
    }
}