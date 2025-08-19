import { Given, When, Then } from "@cucumber/cucumber"
import { LoginPage } from "../page-objects/LoginPage.js"
import { Headers } from "../page-objects/Header.js"
import { Account } from "../page-objects/AccountPage.js"
import { AllAccounts } from "../page-objects/AllAccountsPage.js"
import { NewAccounts } from "../page-objects/NewAccountPage.js"
import { NewContact } from "../page-objects/NewContactPage.js"
import { ParentOpportunity } from "../page-objects/ParentOpportunityPage.js"
import { LoginAccount } from "../page-objects/LoginAccount.js"
import { WCT } from "../page-objects/WTCPage.js"
import { Comands } from "../../Common/Comands.js"
import assert from "assert"
import assert from "node:assert";
import { log } from "console"

let SFPage
let NameRun = ""
let FNameRun = "Automation"
let LNameRun = ""
let AccountProfile = ""
let EmailRun = ""
let ULID = ""
let CID = ""
let URL = ""
let Worker = `${process.env.CUCUMBER_WORKER_ID}`


Given, When, Then('Log in as a {string}', async function (Person) {
    SFPage = new LoginAccount(this.page)
    await SFPage.LogInAs(Person)
    console.log(`Worker ID ${Worker}:  Log in as ${Person}`)
})

Given, When, Then('Back to System Admin', async function () {
    SFPage = new LoginAccount(this.page)
    await SFPage.BackToSystemAdmin()
    console.log(`Worker ID ${Worker}:  Back to System Admin`)
})

Given('I\'m on the login page', async function () {
    SFPage = new LoginPage(this.page)
    await SFPage.visit()
    await SFPage.NormalLogin()
    console.log(`Worker ID ${Worker}:  I\'m on the login page`)
})

Given('Validate if need token', async function () {
    let RandomNames = await SFPage.getNameRun()
    NameRun = `Automation ${RandomNames} Run`
    LNameRun = `${RandomNames} Last Name`
    EmailRun = await SFPage.getEmail(RandomNames)
    ULID = await SFPage.getULID()
    CID = await SFPage.getCompanyID()
    this.DataName = NameRun
    this.DataEmail = EmailRun
    this.CanodicalULID = ULID
    this.CompID = CID
    SFPage = new LoginAccount(this.page)
    //Only uncomment the line below if you need put the Verification Code
    //await SFPage.Comands.Wait(this.page,20000)
    await SFPage.ValidateToken()
    console.log(`Worker ID ${Worker}:  Validate if need token`)
})

Given('Select {string} app on App Launcher', async function (Option) {
    SFPage = new Headers(this.page)
    await SFPage.SelectAppLauncher(Option)
    console.log(`Worker ID ${Worker}:  Select ${Option} app on App Launcher`)
})

Given('Login with a {string} account', async function (Profile) {
    SFPage = new LoginPage(this.page)
    let RandomNames = await SFPage.getNameRun()
    NameRun = `Automation ${RandomNames} Run`
    LNameRun = `${RandomNames} Last Name`
    EmailRun = await SFPage.getEmail(RandomNames)
    ULID = await SFPage.getULID()
    CID = await SFPage.getCompanyID()
    this.DataName = NameRun
    this.DataEmail = EmailRun
    this.CanodicalULID = ULID
    this.CompID = CID
    SFPage = new LoginAccount(this.page)
    //Only uncomment the line below if you need put the Verification Code
    await SFPage.Comands.Wait(this.page, 20000)
    await SFPage.OppPage()
    console.log(`Worker ID ${Worker}:  Login with a ${Profile} account`)
})

When('Go to top menu', async function () {
    //SFPage = new Headers(this.page)
    //await SFPage.Tab()
    console.log(`Worker ID ${Worker}:  Go to top menu`)
})

When('Select {string} on top menu', async function (Option) {
    SFPage = new Headers(this.page)
    await SFPage.SelectMenu(Option)
    console.log(`Worker ID ${Worker}:  Select ${Option} on top menu`)
})

When('Click on {string} button on {string} page', async function (button, SelectedPage) {
    switch (SelectedPage) {
        case 'Account':
            SFPage = new Account(this.page)
            await SFPage.ClickButton(button)
            break
        case 'Accounts':
            SFPage = new AllAccounts(this.page)
            await SFPage.ClickButton(button)
            break
        case 'New Account':
            SFPage = new NewAccounts(this.page)
            await SFPage.ClickButton(button)
            break
        case 'New Contacts':
            SFPage = new NewContact(this.page)
            await SFPage.ClickButton(button)
            break
        case 'Opportunity':
            SFPage = new ParentOpportunity(this.page, this.page.url())
            await SFPage.ClickButton(button)
            await SFPage.visitWaiting()
            break
    }
    console.log(`Worker ID ${Worker}:  Click on ${button} button on ${SelectedPage} page`)
})

When('Add New Account', async function () {
    SFPage = new NewAccounts(this.page)
    await SFPage.AddNewAccount(NameRun, ULID, CID)
    console.log(`Worker ID ${Worker}:  Add New Account`)
})

When('Add New Contact', async function () {
    SFPage = new Account(this.page)
    AccountProfile = this.page.url()
    this.AccountURL = AccountProfile
    await SFPage.NewContact()
    SFPage = new NewContact(this.page, AccountProfile)
    await SFPage.AddNewContact(FNameRun, LNameRun, EmailRun)
    console.log(`Worker ID ${Worker}:  Add New Contact`)
})

When('Select the {string} Tab', async function (Tab) {
    SFPage = new Headers(this.page, AccountProfile)
    switch (Tab) {
        case 'Account':
            console.log(AccountProfile)
            SFPage.visit()
            break
    }
    console.log(`Worker ID ${Worker}:  Select the ${Tab} Tab`)
})

When('Select the {string} Tab on Opportunity page', async function (Tab) {
    SFPage = new ParentOpportunity(this.page)
    await SFPage.ClickTab(Tab)
    console.log(`Worker ID ${Worker}:  Select the ${Tab} Tab on Opportunity Page`)
})

When('Select {string} subtab on Account page', async function (Subtab) {
    SFPage = new Account(this.page)
    switch (Subtab) {
        case 'Contacts':
            await SFPage.tabContacts()
            break
        case 'Qualification':
            await SFPage.tabQualification()
            break
    }
    console.log(`Worker ID ${Worker}:  Select ${Subtab} subtab on Account page`)
})

When('Click on {string} button on Standart subtab', async function (Button) {
    SFPage = new Account(this.page)
    await SFPage.ClickButton(Button)
    //page.elements.click(page.locators[Button])
    console.log(`Worker ID ${Worker}:  Click on ${Button} button on Standart subtab`)
})

When('Select {string} as Core Product', async function (Product) {
    SFPage = new Account(this.page)
    await SFPage.SelectCoreProduct(Product)
    console.log(`Worker ID ${Worker}:  Select ${Product} as Core Product`)
})

When('Fill Scrubbing', async function () {
    SFPage = new Account(this.page)
    await SFPage.FillScrubbing()
    console.log(`Worker ID ${Worker}:  Fill Scrubbing`)
})

When('Fill {string} {string} {string} {string} {string} {string} Scrubbing', async function (website, bstreet, bcity, bstate, bzip, bcountry) {
    SFPage = new Account(this.page)
    await SFPage.FillScrubbing(website, bstreet, bcity, bstate, bzip, bcountry)
    console.log(`Worker ID ${Worker}:  Fill 2.0 Scrubbing`)
})

When('Fill Qualifying', async function () {
    SFPage = new Account(this.page)
    await SFPage.FillQualifying(`${FNameRun} ${LNameRun}`)
    console.log(`Worker ID ${Worker}:  Fill Qualifying`)
})

When('Fill {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} Qualifying', async function (PrimaryBusinessOption, problem, priority, wantsmedical, eorprovider, currentpayroll, hi, month, risk, vertx, anyone, stateop, intcountry, intemp, intcont) {
    SFPage = new Account(this.page)
    await SFPage.FillQualifying(`${FNameRun} ${LNameRun}`, PrimaryBusinessOption, problem, priority, wantsmedical, eorprovider, currentpayroll, hi, month, risk, vertx, anyone, stateop, intcountry, intemp, intcont)
    console.log(`Worker ID ${Worker}:  Fill Qualifyingx`)
})

When('Fill and Complete Sales Qualified', async function () {
    SFPage = new Account(this.page)
    await SFPage.FillSales()
    await SFPage.FillCallOutcome()
    console.log(`Worker ID ${Worker}:  Fill and Complete Sales Qualified`)
})

When('Fill and Complete {string} {string} {string} Sales Qualified', async function (ft, pt, nextstep) {
    SFPage = new Account(this.page)
    await SFPage.FillSales()
    await SFPage.FillCallOutcome(ft, pt, nextstep)
    console.log(`Worker ID ${Worker}:  Fill and Complete Sales Qualifiedx`)
})

When('Fill Negotiate Details on Opportunity page and Save', async function () {
    SFPage = new ParentOpportunity(this.page)
    await SFPage.FillNegotiateDetails()
    console.log('Fill Negotiate Details')
})

When('Visit {string} Opportunity', async function (URL_Opp) {
    SFPage = new LoginAccount(this.page, URL_Opp)
    URL = URL_Opp
    await SFPage.visit()
    console.log(`Worker ID ${Worker}:  Visit ${URL_Opp} Opportunity`)
})

When('Add HIQ Underwriting', async function () {
    console.log(`Worker ID ${Worker}:  Add HIQ Underwriting`)
})

When('Add WCT Underwriting', async function () {
    SFPage = new ParentOpportunity(this.page)
    await SFPage.AddFillWCT()
    console.log(`Worker ID ${Worker}:  Add WCT Underwriting`)
})

When('Add MICO Underwriting', async function () {
    console.log(`Worker ID ${Worker}:  Add MICO Underwriting`)
})

When('Add CRIMSON SAGE Underwriting', async function () {
    console.log(`Worker ID ${Worker}:  Add CRIMSON SAGE Underwriting`)
})

When('Click on {string} link on Opportunity page', async function (link) {
    SFPage = new ParentOpportunity(this.page)
    await SFPage.ClickLink(link)
    console.log(`Worker ID ${Worker}:  Click on ${link} link on Opportunity page`)
})

When('Click on {string} on All Accounts page', async function (element) {
    SFPage = new AllAccounts(this.page)
    await SFPage.Elements.click(this.page, SFPage.locators[element])
    console.log(`Worker ID ${Worker}:  Click on ${element} on All Accounts page`)
})

When('Click on {string} subtab on Account page', async function (element) {
    SFPage = new Account(this.page)
    await SFPage.Elements.click(this.page, SFPage.locators[element])
    console.log(`Worker ID ${Worker}:  Click on ${element} subtab on Account page`)
})

When('Click on {string} Tab', async function (Tab) {
    SFPage = new Headers(this.page, AccountProfile)
    switch (Tab) {
        case 'Account':
            console.log(AccountProfile)
            SFPage.visit()
            break
    }
    console.log(`Worker ID ${Worker}:  Click on ${Tab} Tab`)
})

When('Fill the Required Details', async function () {
    SFPage = new Account(this.page)
    await SFPage.FillRequiredDetails(`${FNameRun} ${LNameRun}`)
    console.log(`Worker ID ${Worker}:  Fill the Required Details`)
})

When('Fill the Required Details for a Partner Referral', async function () {
    SFPage = new Account(this.page)
    await SFPage.FillRequiredDetailsPR()
    console.log(`Worker ID ${Worker}:  Fill the Required Details for a Partner Referral`)
})

When('Fill the Discovery Call', async function () {
    SFPage = new Account(this.page)
    await SFPage.FillDiscoveryCall()
    console.log(`Worker ID ${Worker}:  Fill the Discovery Call`)
})

When('Click on {string} on the pop-up on Account page', async function (element) {
    SFPage = new Account(this.page)
    await SFPage.Elements.click(this.page, SFPage.locators[`Pop-up ${element}`])
    console.log(`Worker ID ${Worker}:  Click on ${element} on the pop-up on Account page`)
})

When('Click on {string} on Account page', async function (element) {
    SFPage = new Account(this.page)
    await SFPage.Elements.click(this.page, SFPage.locators[element])
    console.log(`Worker ID ${Worker}:  Click on ${element} on Account page`)
})

When('Select the Partner Referral on Account page', async function () {
    SFPage = new Account(this.page)
    await SFPage.SelectPartnerReferral()
    console.log(`Worker ID ${Worker}:  Select the Partner Referral on Account page`)
})

When('Click on {string} on Parent Opportunity page', async function (element) {
    SFPage = new ParentOpportunity(this.page)
    await SFPage.Elements.click(this.page, SFPage.locators[element])
    console.log(`Worker ID ${Worker}:  Click on ${element} on Parent Opportunity page`)
})

When('Fill Product {string} on Parent Opportunity page', async function (element) {
    SFPage = new ParentOpportunity(this.page)
    await SFPage.SelectProduct(element)
    console.log(`Worker ID ${Worker}:  Click on ${element} on Parent Opportunity page`)
})

When('Fill Product PEO {string} on Parent Opportunity page', async function (BorP) {
    SFPage = new ParentOpportunity(this.page)
    await SFPage.PEO(BorP)
    console.log(`Worker ID ${Worker}:  Click on ${BorP} on Parent Opportunity page`)
})

When('Validate the Child Opportunity it\'s in {string}', async function (Phase) {
    SFPage = new ParentOpportunity(this.page)
    assert.ok(await SFPage.ValidatePhase(Phase), `Opportunity it's not in the ${Phase} phase`)
    console.log(`Worker ID ${Worker}:  Validate the Opportunity it\'s in ${Phase}`)
})

When('Click on {string} of {string} on Parent Opportunity page', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('Click on {string} on pop-up Parent Opportunity page', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('Fill Discount {string} and {string} on Parent Opportunity page', async function (string, string2) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Validate the Discount {string} is displayed on Parent Opportunity page', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Validate the Discount {string} is removed on Parent Opportunity page', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('Validate the Parent Opportunity it\'s in {string}', async function (Phase) {
    SFPage = new ParentOpportunity(this.page)
    assert.ok(await SFPage.ValidateParentPhase(Phase), `Opportunity it's not in the ${Phase} phase`)
    console.log(`Worker ID ${Worker}:  Validate the Opportunity it\'s in ${Phase}`)
})

Then('Validate the HIQ Underwriting it\'s in {string}', async function (Phase) {
    console.log(`Worker ID ${Worker}:  Validate the HIQ Underwriting`)
})

Then('Validate the WCT Underwriting it\'s in {string}', async function (Phase) {
    SFPage = new WCT(this.page)
    assert.ok(await SFPage.ValidationSubmit(Phase), `WCT it's not in the ${Phase} phase`)
    console.log(`Worker ID ${Worker}:  Validate the WCT Underwriting`)
})

Then('Validate the MICO Underwriting it\'s in {string}', async function (Phase) {
    console.log(`Worker ID ${Worker}:  Validate the MICO Underwriting`)
})

Then('Validate the CRIMSON SAGE Underwriting it\'s in {string}', async function (Phase) {
    console.log(`Worker ID ${Worker}:  Validate the CRIMSON SAGE Underwriting`)
})

Then('Validate the Opportunity it\'s in {string}', async function (Phase) {
    SFPage = new ParentOpportunity(this.page)
    assert.ok(await SFPage.ValidatePhase(Phase), `Opportunity it's not in the ${Phase} phase`)
    console.log(`Worker ID ${Worker}:  Validate the Opportunity it\'s in ${Phase}`)
})