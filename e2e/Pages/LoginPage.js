import { Comands } from "../Common/Comands.js"
import { paths } from "../Common/Paths.js"
import Elements from "../Common/Elements.js"
import IFrame from "../Common/iFrame.js"
import * as fs from 'fs';

export class LoginPage {
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
            "Username Field": this.page.getByPlaceholder('Username'),
            "Password Field": this.page.getByPlaceholder('Password'),
            "Login Button": this.page.getByRole('button', { name: 'Login' }),
            "Invalid Credentials Message": this.page.getByRole('alert').locator('div').filter({ hasText: 'Invalid credentials' }),
        }
    }


    async login(email, password) {
        await this.Elements.fill(this.page, this.locators["Username Field"], email)
        await this.Elements.fill(this.page, this.locators["Password Field"], password)
        await this.Elements.click(this.page, this.locators["Login Button"])
    }

    async getLoginErrorMessage() {
        return await this.Elements.waitElementBeVisible(this.page, this.locators["Invalid Credentials Message"])
    }

    async visit() {
        await Promise.all([this.page.goto(this.url), this.waitLoadPage()])
    }

    async waitLoadPage() {
        await this.page.waitForURL(this.url)
    }
}