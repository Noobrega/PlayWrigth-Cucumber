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

class Lists {
    /**
     * Constructor
     * @param {Object} locators Object with all locators (strings)
     * @param {Number} timeouts Object with all timeouts (numbers)
     */
    constructor(locators, timeouts = {}) {
        this.internalLocators = locators
        this.internalTimeouts = timeouts
        //this.Comands = new Comands()
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

    // =======================
    // 🧲 Getters
    // =======================

    /**
     * Get element in list by position
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator - The list container element
     * @param {string} repetitionElement - The repeated child element inside the list (e.g., 'li', '.row')
     * @param {number} position - Zero-based index of the desired item
     * @returns {Promise<import('@playwright/test').Locator>} the locator for the item at the given position
     * @example const thirdItem = await Lists.getListElementByPosition(page,'.list','li',2)
     */
    getListElementByPosition(page, List, repetitionElement, position) {
        const Locator = this.waitElementBeVisible(page, List)
        return Locator.locator(repetitionElement).nth(position - 1);
    }

    /**
     * Get element in list by position
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator - The list container element
     * @param {string} repetitionElement - The repeated child element inside the list (e.g., 'li', '.row')
     * @param {number} position - Zero-based index of the desired item
     * @returns {Promise<import('@playwright/test').Locator>} the locator for the item at the given position
     * @example const thirdItem = await Lists.getListElementByPosition(page,'.list','li',2)
     */
    getListElementByContentWithoutInternalElement(page, List, repetitionElement, position) {
        const Locator = this.waitElementBeVisible(page, List)
        return Locator.locator(repetitionElement).nth(position - 1);
    }

    /**
     * Get element in list by position
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator - The list container element
     * @param {string} repetitionElement - The repeated child element inside the list (e.g., 'li', '.row')
     * @param {number} position - Zero-based index of the desired item
     * @returns {Promise<import('@playwright/test').Locator>} the locator for the item at the given position
     * @example const thirdItem = await Lists.getListElementByPosition(page,'.list','li',2)
     */
    getListElementByPosition(page, List, repetitionElement, position) {
        const Locator = this.waitElementBeVisible(page, List)
        return Locator.locator(repetitionElement).nth(position - 1);
    }

    /**
     * Get element in list by position
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator - The list container element
     * @param {string} repetitionElement - The repeated child element inside the list (e.g., 'li', '.row')
     * @param {number} position - Zero-based index of the desired item
     * @returns {Promise<import('@playwright/test').Locator>} the locator for the item at the given position
     * @example const thirdItem = await Lists.getListElementByPosition(page,'.list','li',2)
     */
    getListElementByPosition(page, List, repetitionElement, position) {
        const Locator = this.waitElementBeVisible(page, List)
        return Locator.locator(repetitionElement).nth(position - 1);
    }
}

export default Lists