import { expect } from '@playwright/test'
import { Comands } from './Comands.js'

class IFrame {

    /**
    * Constructor
    * @param {Object} iframe Object with all iframes (strings)
    * @param {Object} locators Object with all locators (strings)
    * @param {Number} timeouts Object with all timeouts (numbers)
    */
    constructor(iframe, locators, timeouts = {}) {
        this.iframe = iframe
        this.internalLocators = locators
        this.internalTimeouts = timeouts
        this.Comands = new Comands()
    }

    // =======================
    // 📌 INPUTS & FORMS
    // =======================

    /**
    * Fill an input field with the specified text.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {string} text
    * @example await elements.fill(page, ' .iframe ', '#email', 'example@mail.com')
    */
    async fill(page, iframe, selector, text) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).fill(text)
    }

    /**
    * Type text into an element, character by character.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {string} text
    * @param {object} [options]
    * @example await elements.type(page, ' .iframe ', '#search', 'Playwright')
    */
    async type(page, iframe, selector, text, options = {}) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).type(text, options)
    }

    /**
    * Press a key on the selected element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {string} key
    * @example await elements.press(page, ' .iframe ', '#form', 'Enter')
    */
    async press(page, iframe, selector, key) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).press(key)
    }

    /**
    * Clear the value of an input field.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @example await elements.clear(page, ' .iframe ', '#username')
    */
    async clear(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).fill('')
    }

    /**
    * Send a file.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {string} file
    * @example await elements.setInputFiles(page, ' .iframe ', '#form', 'C://my-files//file.pdf')
    */
    async setInputFiles(page, iframe, selector, files) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).setInputFiles(files)
    }

    // =======================
    // 🖱️ MOUSE ACTIONS
    // =======================

    /**
    * Click on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {object} [options]
    * @example await elements.click(page, ' .iframe ', '#submit')
    */
    async click(page, iframe, selector, options = {}) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).click(options)
    }

    /**
    * Click on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {object} [options]
    * @example await elements.click(page, ' .iframe ', '#submit')
    */
    async clickPosition(page, iframe, selector, position, options = {}) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).nth(position).click(options)
    }

    /**
    * Double-click on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {object} [options]
    * @example await elements.dblclick(page, ' .iframe ', '.card')
    */
    async dblclick(page, iframe, selector, options = {}) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).dblclick(options)
    }

    /**
    * Hover over an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @example await elements.hover(page, ' .iframe ', '.tooltip')
    */
    async hover(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).hover()
    }

    /**
    * Right-click on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @example await elements.rightClick(page, ' .iframe ', '#context')
    */
    async rightClick(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).click({ button: 'right' })
    }

    /**
    * Focus on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @example await elements.focus(page, ' .iframe ', 'input[name="password"]')
    */
    async focus(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).focus()
    }

    /**
    * Tap on an element (mobile).
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @example await elements.tap(page, ' .iframe ', '.mobile-button')
    */
    async tap(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).tap()
    }

    // =======================
    // 🧪 STATE CHECKS
    // =======================

    /**
    * Check if the element is visible.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @returns {Promise<boolean>}
    */
    async isVisible(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        return await page.frameLocator(iframe).locator(selector).isVisible()
    }

    /**
    * Check if the element is hidden.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @returns {Promise<boolean>}
    */
    async isHidden(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        return await page.frameLocator(iframe).locator(selector).isHidden()
    }

    /**
    * Check if the element is enabled.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @returns {Promise<boolean>}
    */
    async isEnabled(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        return await page.frameLocator(iframe).locator(selector).isEnabled()
    }

    /**
    * Check if the element is editable.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @returns {Promise<boolean>}
    */
    async isEditable(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        return await page.frameLocator(iframe).locator(selector).isEditable()
    }

    /**
    * Check if the element is checked (checkbox/radio).
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @returns {Promise<boolean>}
    */
    async isChecked(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        return await page.frameLocator(iframe).locator(selector).isChecked()
    }

    // =======================
    // ✅ CHECKBOXES & RADIOS
    // =======================

    /**
    * Check a checkbox or radio input.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {object} [options]
    * @example await elements.check(page, ' .iframe ', '#terms')
    */
    async check(page, iframe, selector, options = {}) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).check(options)
    }

    /**
    * Uncheck a checkbox input.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {object} [options]
    * @example await elements.uncheck(page, ' .iframe ', '#newsletter')
    */
    async uncheck(page, iframe, selector, options = {}) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).uncheck(options)
    }

    /**
    * Set checkbox/radio input checked status to true or false.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {boolean} checked
    * @example await elements.setChecked(page, ' .iframe ', '#confirm', true)
    */
    async setChecked(page, iframe, selector, checked) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).setChecked(checked)
    }

    // =======================
    // 🔄 SELECT DROPDOWNS
    // =======================

    /**
    * Select one or more options from a dropdown.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {string|string[]|{label?: string, value?: string, index?: number}} values
    * @example await elements.selectOption(page, ' .iframe ', '#plan', 'premium')
    */
    async selectOption(page, iframe, selector, values) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).selectOption(values)
    }

    // =======================
    // 🧱 ADVANCED
    // =======================

    /**
    * Drag an element to another element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} sourceLocator
    * @param {import('@playwright/test').Locator} targetLocator
    * @example await elements.dragTo(page, ' .iframe ', '#item', page.locator('#dropzone'))
    */
    async dragTo(page, iframe, sourceLocator, targetLocator) {
        await this.waitElementBeVisible(page, iframe, sourceLocator)
        await page.frameLocator(iframe).locator(selector).dragTo(targetLocator)
    }

    /**
    * Scroll element into view if needed.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @example await elements.scrollIntoView(page, ' .iframe ', '#footer')
    */
    async scrollIntoView(page, iframe, selector) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).scrollIntoViewIfNeeded()
    }

    /**
    * Take a screenshot of an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {string} path - Path to save the screenshot.
    * @example await elements.screenshot(page, ' .iframe ', '#banner', 'banner.png')
    */
    async screenshot(page, iframe, selector, path) {
        await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).screenshot({ path })
    }

    /**
    * Evaluate a function in the context of the element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {(element: HTMLElement) => any} fn
    * @returns {Promise<any>}
    * @example await elements.evaluate(page, ' .iframe ', '#price', el => el.textContent)
    */
    async evaluate(page, iframe, selector, fn) {
        await this.waitElementBeVisible(page, iframe, selector)
        return await page.frameLocator(iframe).locator(selector).evaluate(fn)
    }

    // =======================
    // 🕐 WAITS & SYNC
    // =======================

    /**
    * Wait for an element to reach a specific state.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {'attached'|'detached'|'visible'|'hidden'} [state='visible']
    * @param {number} [timeout=30000]
    * @example await elements.waitFor(page, ' .iframe ', '#modal', 'hidden')
    */
    async waitFor(page, iframe, selector, state, timeout = 30000) {
        //await this.waitElementBeVisible(page, iframe, selector)
        await page.frameLocator(iframe).locator(selector).waitFor({ state, timeout })
    }

    /**
    * Wait for a specific amount of time (ms).
    * @param {import('@playwright/test').Page} page
    * @param {number} ms
    * @example await elements.waitForTimeout(page, 2000)
    */
    async waitForTimeout(page, ms) {
        await page.waitForTimeout(ms)
    }

    /**
    * Wait for a selector using Playwright’s native method.
    * @param {import('@playwright/test').Page} page
    * @param {string} selector
    * @param {object} [options]
    * @example await elements.waitForSelector(page, ' .iframe ', '.toast', { state: 'visible' })
    */
    async waitForSelector(page, iframe, selector, options = {}) {
        await page.frameLocator(iframe).waitForSelector(selector, options)
    }

    /**
    * Waits for the element to be visible, then returns the Locator.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} Locator
    * @param {number} [timeout=30000] - Timeout in milliseconds
    * @returns {Promise<import('@playwright/test').Locator>}
    * @example const locator = await elements.waitElementBeVisible(page, ' .iframe ', '#submit')
    */
    async waitElementBeVisible(page, iframe, locator, State = 'visible', Timeout = 30000) {
        const loc = await page.frameLocator(iframe).locator(locator)
        return await loc.first().waitFor({ state: State, timeout: Timeout }).then(() => true).catch(() => false)
    }


    /**
    * Waits until one of the two locators is visible and returns which one was found.
    * @param {import('@playwright/test').Page} page
    * @param {string} Locator
    * @param {string|import('@playwright/test').frameLocator} iFrame
    * @param {string|import('@playwright/test').Locator} locator1 
    * @param {string|import('@playwright/test').Locator} locator2 
    * @param {number} timeout 
    * @returns {Promise<string>}
    */
    async waitForOneOfTwoLocators(page, iframe, locator1, locator2, timeout = 15000) {
        const loc1 = await page.frameLocator(iframe).locator(locator1)
        const loc2 = await page.frameLocator(iframe).locator(locator2)

        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            const First = await loc1.first().waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false)
            const Second = await loc2.first().waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false)

            if (First) {
                return `First`
            }
            if (Second) {
                return `Second`
            }
            await page.waitForTimeout(100);
        }

        throw new Error(`None of the locators were found within ${timeout}ms`);
    }

    /**
     * Waits until one of the two locators is visible and returns which one was found.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').frameLocator} iFrame
     * @param {string|import('@playwright/test').Locator} locator1 
     * @param {number} pos1 
     * @param {string|import('@playwright/test').Locator} locator2 
     * @param {number} pos2 
     * @param {number} timeout 
     * @returns {Promise<string>}
     */
    async waitForOneOfTwoLocatorsWithPossition(page, iframe, locator1, pos1, locator2, pos2, timeout = 15000) {
        const loc1 = await page.frameLocator(iframe).locator(locator1)
        const loc2 = await page.frameLocator(iframe).locator(locator2)

        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            const First = await loc1.nth(pos1).first().waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false)
            const Second = await loc2.nth(pos2).first().waitFor({ state: 'visible', timeout: 4000 }).then(() => true).catch(() => false)

            if (First) {
                return `First`
            }
            if (Second) {
                return `Second`
            }
            await page.waitForTimeout(100);
        }

        throw new Error(`None of the locators were found within ${timeout}ms`);
    }

}

export default IFrame

