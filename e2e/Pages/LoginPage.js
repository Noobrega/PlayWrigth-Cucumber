import { Comands } from "../Common/Comands.js"
import { paths } from "../Common/paths.js"
import Elements from "../Common/Elements.js"
import IFrame from "../Common/iFrame.js"
import * as fs from 'fs'
import { expect } from "@playwright/test"

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
            "Error Message": this.page.locator('.oxd-alert-content-text'),
            //"Error Message": this.page.locator('//p[contains(@class,"alert-content-error")]'),
        }
    }


    async login(email = process.env.email, password = process.env.password) {
        await this.Elements.fill(this.page, this.locators["Username Field"], email)
        await this.Elements.fill(this.page, this.locators["Password Field"], password)
        await this.Elements.click(this.page, this.locators["Login Button"])
    }

    async getLoginErrorMessage(errorMessage) {
        await this.Elements.ExpectText(this.page, this.locators["Error Message"], errorMessage)
    }

    async visit() {
        await Promise.all([this.page.goto(this.url), this.waitLoadPage()])
    }

    async waitLoadPage() {
        await this.page.waitForURL(this.url)
    }
}