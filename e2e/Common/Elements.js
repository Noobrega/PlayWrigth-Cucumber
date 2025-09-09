import { expect } from '@playwright/test'
import { Comands } from './Comands.js'

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

class Elements {

    /**
    * Constructor
    * @param {Object} locators Object with all locators (strings)
    * @param {Number} timeouts Object with all timeouts (numbers)
    */
    constructor(locators, timeouts = {}) {
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
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {string} text
    * @example await elements.fill(page, '#email', 'example@mail.com')
    */
    async fill(page, selectorOrLocator, text) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.fill(text)
    }

    /**
    * Type text into an element, character by character.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {string} text
    * @param {object} [options]
    * @example await elements.type(page, '#search', 'Playwright')
    */
    async type(page, selectorOrLocator, text, options = {}) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.type(text, options)
    }

    /**
    * Press a key on the selected element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {string} key
    * @example await elements.press(page, '#form', 'Enter')
    */
    async press(page, selectorOrLocator, key) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.press(key)
    }

    /**
    * Clear the value of an input field.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @example await elements.clear(page, '#username')
    */
    async clear(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.fill('')
    }

    /**
    * Send a file.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {string} file
    * @example await elements.setInputFiles(page, '#form', 'C://my-files//file.pdf')
    */
    async setInputFiles(page, selectorOrLocator, files) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.setInputFiles(files)
    }

    // =======================
    // 🖱️ MOUSE ACTIONS
    // =======================

    /**
    * Click on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {object} [options]
    * @example await elements.click(page, '#submit')
    */
    async click(page, selectorOrLocator, options = {}) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.click(options)
    }

    /**
    * Click on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {object} [options]
    * @example await elements.click(page, '#submit')
    */
    async clickPosition(page, selectorOrLocator, position, options = {}) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.nth(position).click(options)
    }

    /**
    * Double-click on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {object} [options]
    * @example await elements.dblclick(page, '.card')
    */
    async dblclick(page, selectorOrLocator, options = {}) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.dblclick(options)
    }

    /**
    * Hover over an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @example await elements.hover(page, '.tooltip')
    */
    async hover(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.hover()
    }

    /**
    * Right-click on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @example await elements.rightClick(page, '#context')
    */
    async rightClick(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.click({ button: 'right' })
    }

    /**
    * Focus on an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @example await elements.focus(page, 'input[name="password"]')
    */
    async focus(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.focus()
    }

    /**
    * Tap on an element (mobile).
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @example await elements.tap(page, '.mobile-button')
    */
    async tap(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.tap()
    }

    // =======================
    // 🧪 STATE CHECKS
    // =======================

    /**
    * Check if the element is visible.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @returns {Promise<boolean>}
    */
    async isVisible(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        return await locator.isVisible()
    }

    /**
    * Check if the element is hidden.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @returns {Promise<boolean>}
    */
    async isHidden(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        return await locator.isHidden()
    }

    /**
    * Check if the element is enabled.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @returns {Promise<boolean>}
    */
    async isEnabled(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        return await locator.isEnabled()
    }

    /**
    * Check if the element is editable.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @returns {Promise<boolean>}
    */
    async isEditable(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        return await locator.isEditable()
    }

    /**
    * Check if the element is checked (checkbox/radio).
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @returns {Promise<boolean>}
    */
    async isChecked(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        return await locator.isChecked()
    }

    // =======================
    // ✅ CHECKBOXES & RADIOS & ASSERTS
    // =======================

    /**
    * Check a checkbox or radio input.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {object} [options]
    * @example await elements.check(page, '#terms')
    */
    async check(page, selectorOrLocator, options = {}) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.check(options)
    }

    /**
    * Check a checkbox or radio input.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {string} text
    * @param {object} [options]
    * @example await elements.check(page, '#terms')
    */
    async ExpectText(page, selectorOrLocator, text, options = {}) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await expect(locator).toHaveText(text, options)
    }

    /**
    * Uncheck a checkbox input.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {object} [options]
    * @example await elements.uncheck(page, '#newsletter')
    */
    async uncheck(page, selectorOrLocator, options = {}) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.uncheck(options)
    }

    /**
    * Set checkbox/radio input checked status to true or false.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {boolean} checked
    * @example await elements.setChecked(page, '#confirm', true)
    */
    async setChecked(page, selectorOrLocator, checked) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.setChecked(checked)
    }

    // =======================
    // 🔄 SELECT DROPDOWNS
    // =======================

    /**
    * Select one or more options from a dropdown.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {string|string[]|{label?: string, value?: string, index?: number}} values
    * @example await elements.selectOption(page, '#plan', 'premium')
    */
    async selectOption(page, selectorOrLocator, values) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.selectOption(values)
    }

    // =======================
    // 🧱 ADVANCED
    // =======================

    /**
    * Drag an element to another element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} sourceSelectorOrLocator
    * @param {import('@playwright/test').Locator} targetLocator
    * @example await elements.dragTo(page, '#item', page.locator('#dropzone'))
    */
    async dragTo(page, sourceSelectorOrLocator, targetLocator) {
        const source = await this.waitElementBeVisible(page, sourceSelectorOrLocator)
        await source.dragTo(targetLocator)
    }

    /**
    * Scroll element into view if needed.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @example await elements.scrollIntoView(page, '#footer')
    */
    async scrollIntoView(page, selectorOrLocator) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.scrollIntoViewIfNeeded()
    }

    /**
    * Take a screenshot of an element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {string} path - Path to save the screenshot.
    * @example await elements.screenshot(page, '#banner', 'banner.png')
    */
    async screenshot(page, selectorOrLocator, path) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.screenshot({ path })
    }

    /**
    * Evaluate a function in the context of the element.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {(element: HTMLElement) => any} fn
    * @returns {Promise<any>}
    * @example await elements.evaluate(page, '#price', el => el.textContent)
    */
    async evaluate(page, selectorOrLocator, fn) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        return await locator.evaluate(fn)
    }

    // =======================
    // 🕐 WAITS & SYNC
    // =======================

    /**
    * Wait for an element to reach a specific state.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} selectorOrLocator
    * @param {'attached'|'detached'|'visible'|'hidden'} [state='visible']
    * @param {number} [timeout=30000]
    * @example await elements.waitFor(page, '#modal', 'hidden')
    */
    async waitFor(page, selectorOrLocator, state, timeout = 30000) {
        const locator = await this.waitElementBeVisible(page, selectorOrLocator)
        await locator.waitFor({ state, timeout })
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
    * @example await elements.waitForSelector(page, '.toast', { state: 'visible' })
    */
    async waitForSelector(page, selector, options = {}) {
        await page.waitForSelector(selector, options)
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

    /**
    * Waits until one of the two locators is visible and returns which one was found.
    * @param {import('@playwright/test').Page} page
    * @param {string|import('@playwright/test').Locator} locator1 
    * @param {string|import('@playwright/test').Locator} locator2 
    * @param {number} timeout 
    * @returns {Promise<string>}
    */
    async waitForOneOfTwoLocators(page, locator1, locator2, timeout = 15000) {
        const loc1 = resolveLocator(page, locator1)
        const loc2 = resolveLocator(page, locator2)

        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            if (await loc1.isVisible()) {
                return 'First';
            }
            if (await loc2.isVisible()) {
                return 'Second';
            }
            await page.waitForTimeout(100); 
        }

        throw new Error(`None of the locators were found within ${timeout}ms`);
    }

    /**
     * Waits until one of the two locators is visible and returns which one was found.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} locator1 
     * @param {number} pos1 
     * @param {string|import('@playwright/test').Locator} locator2 
     * @param {number} pos2 
     * @param {number} timeout 
     * @returns {Promise<string>}
     */
    async waitForOneOfTwoLocatorsWithPossition(page, locator1, pos1, locator2, pos2, timeout = 15000) {
        const loc1 = resolveLocator(page, locator1)
        const loc2 = resolveLocator(page, locator2)

        const startTime = Date.now();

        while (Date.now() - startTime < timeout) {
            if (await loc1.nth(pos1).isVisible()) {
                return 'First';
            }
            if (await loc2.nth(pos2).isVisible()) {
                return 'Second';
            }
            await page.waitForTimeout(100);
        }

        throw new Error(`None of the locators were found within ${timeout}ms`);
    }

}

export default Elements

