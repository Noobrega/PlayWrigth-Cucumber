import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import assert from "node:assert";

let page;

Given("the user is on the steps page", async function () {
  await this.page.goto("/steps");
  await this.page.waitForSelector("h1:has-text('Steps')");  
    const title = await this.page.title();
})

When("the user clicks on the first step", async function () {
  const firstStep = await this.page.$("li.step:nth-child(1)");
  assert(firstStep, "First step not found");
  await firstStep.click();
})

Then("the first step should be active", async function () { 
    const activeStep = await this.page.$("li.step.active");
    assert(activeStep, "Active step not found");
    
    const firstStep = await this.page.$("li.step:nth-child(1)");
    const isActive = await firstStep.evaluate((el) => el.classList.contains("active"));
    
    expect(isActive).toBe(true);
    }
)

