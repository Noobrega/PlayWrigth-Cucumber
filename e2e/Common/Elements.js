class Elements {

    // =======================
    // 🤖 Exclusive Automation
    // =======================

    /**
     * Waits for the element to be visible, then returns the Locator.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @param {number} [timeout=30000] - Timeout in milliseconds
     * @returns {Promise<import('@playwright/test').Locator>}
     * @example const locator = await this.#resolveLocator(page, '#submit')
     */
    async #resolveLocator(page, selectorOrLocator, timeout = 30000) {
        if (typeof selectorOrLocator === 'object' && typeof selectorOrLocator.click === 'function') {
          return selectorOrLocator
        }
        await locator.waitFor({ state: 'visible', timeout })
        return page.locator(selectorOrLocator)
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
      const locator = await this.#resolveLocator(page, selectorOrLocator)
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
      const locator = await this.#resolveLocator(page, selectorOrLocator)
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
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      await locator.press(key)
    }
  
    /**
     * Clear the value of an input field.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @example await elements.clear(page, '#username')
     */
    async clear(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      await locator.fill('')
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
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      await locator.click(options)
    }
  
    /**
     * Double-click on an element.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @param {object} [options]
     * @example await elements.dblclick(page, '.card')
     */
    async dblclick(page, selectorOrLocator, options = {}) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      await locator.dblclick(options)
    }
  
    /**
     * Hover over an element.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @example await elements.hover(page, '.tooltip')
     */
    async hover(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      await locator.hover()
    }
  
    /**
     * Right-click on an element.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @example await elements.rightClick(page, '#context')
     */
    async rightClick(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      await locator.click({ button: 'right' })
    }
  
    /**
     * Focus on an element.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @example await elements.focus(page, 'input[name="password"]')
     */
    async focus(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      await locator.focus()
    }
  
    /**
     * Tap on an element (mobile).
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @example await elements.tap(page, '.mobile-button')
     */
    async tap(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
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
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      return await locator.isVisible()
    }
  
    /**
     * Check if the element is hidden.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @returns {Promise<boolean>}
     */
    async isHidden(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      return await locator.isHidden()
    }
  
    /**
     * Check if the element is enabled.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @returns {Promise<boolean>}
     */
    async isEnabled(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      return await locator.isEnabled()
    }
  
    /**
     * Check if the element is editable.
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @returns {Promise<boolean>}
     */
    async isEditable(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      return await locator.isEditable()
    }
  
    /**
     * Check if the element is checked (checkbox/radio).
     * @param {import('@playwright/test').Page} page
     * @param {string|import('@playwright/test').Locator} selectorOrLocator
     * @returns {Promise<boolean>}
     */
    async isChecked(page, selectorOrLocator) {
      const locator = await this.#resolveLocator(page, selectorOrLocator)
      return await locator.isChecked()
    }
  
  // =======================
  // ✅ CHECKBOXES & RADIOS
  // =======================

  /**
   * Check a checkbox or radio input.
   * @param {import('@playwright/test').Page} page
   * @param {string|import('@playwright/test').Locator} selectorOrLocator
   * @param {object} [options]
   * @example await elements.check(page, '#terms')
   */
  async check(page, selectorOrLocator, options = {}) {
    const locator = await this.#resolveLocator(page, selectorOrLocator)
    await locator.check(options)
  }

  /**
   * Uncheck a checkbox input.
   * @param {import('@playwright/test').Page} page
   * @param {string|import('@playwright/test').Locator} selectorOrLocator
   * @param {object} [options]
   * @example await elements.uncheck(page, '#newsletter')
   */
  async uncheck(page, selectorOrLocator, options = {}) {
    const locator = await this.#resolveLocator(page, selectorOrLocator)
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
    const locator = await this.#resolveLocator(page, selectorOrLocator)
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
    const locator = await this.#resolveLocator(page, selectorOrLocator)
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
    const source = await this.#resolveLocator(page, sourceSelectorOrLocator)
    await source.dragTo(targetLocator)
  }

  /**
   * Scroll element into view if needed.
   * @param {import('@playwright/test').Page} page
   * @param {string|import('@playwright/test').Locator} selectorOrLocator
   * @example await elements.scrollIntoView(page, '#footer')
   */
  async scrollIntoView(page, selectorOrLocator) {
    const locator = await this.#resolveLocator(page, selectorOrLocator)
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
    const locator = await this.#resolveLocator(page, selectorOrLocator)
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
    const locator = await this.#resolveLocator(page, selectorOrLocator)
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
  async waitFor(page, selectorOrLocator, state = 'visible', timeout = 30000) {
    const locator = await this.#resolveLocator(page, selectorOrLocator)
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
}

export default new Elements()