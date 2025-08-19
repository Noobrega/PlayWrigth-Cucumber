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

class Tables{
    /**
     * Constructor
     * @param {Object} locators Object with all locators (strings)
     * @param {Number} timeouts Object with all timeouts (numbers)
     */
    constructor(locators, timeouts = {}) {
        this.internalLocators = locators
        this.internalTimeouts = timeouts
    }
}

export default Tables