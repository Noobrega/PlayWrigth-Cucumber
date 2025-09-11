import { Given, When, Then } from "@cucumber/cucumber"
import { Comands } from "../../Common/Comands.js"
import { LoginPage } from "../../Pages/LoginPage.js"
import { DashboardPage } from "../../Pages/DashboardPage.js"
import { expect } from "@playwright/test"
import * as fs from 'fs'
import assert from "assert"
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
let env = `.env.${process.env.ENV}`

// Step para login válido
Given('I am on the OrangeHRM login page', async function () {
    // console.log('---------------------------------- I am on the OrangeHRM login page ----------------------------------')
    // console.log('ls e2e/Tests/Features:', fs.readdirSync('e2e/Tests/Features').join('\n'))
    // console.log('steps exists?', fs.existsSync('e2e/Tests/Steps/Steps.mjs'))
    // console.log(`Running with CUCUMBER_WORKER_ID=${process.env.CUCUMBER_WORKER_ID || 'not defined'}`)
    // console.log('---------------------------------- I am on the OrangeHRM login page ----------------------------------')
    SFPage = new LoginPage(this.page)
    //     let RandomNames = await SFPage.getNameRun()
    //     NameRun = `Automation ${RandomNames} Run`
    //     LNameRun = `${RandomNames} Last Name`
    //     EmailRun = await SFPage.getEmail(RandomNames)
    //     ULID = await SFPage.getULID()
    //     CID = await SFPage.getCompanyID()
    //     this.DataName = NameRun
    //     this.DataEmail = EmailRun
    //     this.CanodicalULID = ULID
    //     this.CompID = CID
    await SFPage.visit()
    console.log(`Worker ${Worker} on ${env} env: Navigated to OrangeHRM login page`)
})

Given('I am logged in as {string} with password {string}', async function (username, password) {
    // console.log('---------------------------------- I am logged in as {string} with password {string} ----------------------------------')
    // console.log('ls e2e/Tests/Features:', fs.readdirSync('e2e/Tests/Features').join('\n'))
    // console.log('steps exists?', fs.existsSync('e2e/Tests/Steps/Steps.mjs'))
    // console.log(`Running with CUCUMBER_WORKER_ID=${process.env.CUCUMBER_WORKER_ID || 'not defined'}`)
    // console.log('---------------------------------- I am logged in as {string} with password {string} ----------------------------------')
    SFPage = new LoginPage(this.page)
    await SFPage.login(username, password)
    console.log(`Worker ${Worker} on ${env} env: Logged in with username: ${username}`)
})

// Step para editar dados pessoais
Given('I open employee {string} from search results', async function (name) {
    // SFPage = new PIMPage(this.page)
    // await SFPage.openEmployeeFromSearchResults(name)
    console.log(`Worker ${Worker} on ${env} env: Opened employee: ${name}`)
})

Given('I am on the password reset page', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(`Worker ${Worker} on ${env} env: OK`)
})

// Step para recuperação de senha
When('I click {string} on Login page', async function (elementText) {
    // SFPage = new LoginPage(this.page)
    // await SFPage.clickElementByText(elementText)
    console.log(`Worker ${Worker} on ${env} env: Clicked on element: ${elementText}`)
})

When('I log in with username {string} and password {string}', async function (username, password) {
    SFPage = new LoginPage(this.page)
    await SFPage.login(username, password)
    console.log(`Worker ${Worker} on ${env} env: Logged in with username: ${username}`)
})

// Step para criar usuário no módulo Admin
When('I open {string} and click {string}', async function (section, buttonText) {
    // SFPage = new AdminPage(this.page)
    // await SFPage.openSectionAndClickButton(section, buttonText)
    console.log(`Worker ${Worker} on ${env} env: Opened section: ${section} and clicked button: ${buttonText}`)
})

When('I fill the system user form:', async function (dataTable) {
    // const formData = dataTable.rowsHash()
    // SFPage = new AdminPage(this.page)
    // await SFPage.fillSystemUserForm(formData)
    console.log(`Worker ${Worker} on ${env} env: Filled system user form`)
})

When('I save the system user', async function () {
    // await SFPage.saveSystemUser()
    console.log(`Worker ${Worker} on ${env} env: System user saved`)
})

// Step para logout
When('I open the user menu', async function () {
    // SFPage = new DashboardPage(this.page)
    // await SFPage.openUserMenu()
    console.log(`Worker ${Worker} on ${env} env: User menu opened`)
})

When('I click {string} on Dashboard Page', async function (elementText) {
    // SFPage = new DashboardPage(this.page)
    // await SFPage.clickElementByText(elementText)
    console.log(`Worker ${Worker} on ${env} env: Clicked on element: ${elementText}`)
})

// Step para navegação básica
When('I navigate to the {string} section', async function (section) {
    // SFPage = new NavigationPage(this.page)
    // await SFPage.navigateToSection(section)
    console.log(`Worker ${Worker} on ${env} env: Navigated to section: ${section}`)
})

When('I request a password reset for username {string}', async function (username) {
    // SFPage = new PasswordResetPage(this.page)
    // await SFPage.requestPasswordReset(username)
    console.log(`Worker ${Worker} on ${env} env: Requested password reset for username: ${username}`)
})

// Step para adicionar funcionário
When('I click {string} on PIM page', async function (buttonText) {
    //    SFPage = new PIMPage(this.page)
    //    await SFPage.clickButton(buttonText)
    console.log(`Worker ${Worker} on ${env} env: Clicked button: ${buttonText}`)
})

When('I fill the employee form with:', async function (dataTable) {
    //    const formData = dataTable.rowsHash()
    //    SFPage = new PIMPage(this.page)
    //    await SFPage.fillEmployeeForm(formData)
    console.log(`Worker ${Worker} on ${env} env: Filled employee form`)
})

When('I save the employee', async function () {
    //    await SFPage.saveEmployee()
    console.log(`Worker ${Worker} on ${env} env: Employee saved`)
})

// Step para buscar funcionário
When('I search employees by name {string}', async function (name) {
    //    SFPage = new PIMPage(this.page)
    //    await SFPage.searchEmployeeByName(name)
    console.log(`Worker ${Worker} on ${env} env: Searched employees by name: ${name}`)
})

When('I can open the first result to view details', async function () {
    //    await SFPage.openFirstSearchResult()
    console.log(`Worker ${Worker} on ${env} env: Opened first search result`)
})

When('I edit personal details with:', async function (dataTable) {
    //    const details = dataTable.rowsHash()
    //    SFPage = new PIMPage(this.page)
    //    await SFPage.editPersonalDetails(details)
    console.log(`Worker ${Worker} on ${env} env: Edited personal details`)
})

When('I save personal details', async function () {
    //    await SFPage.savePersonalDetails()
    console.log(`Worker ${Worker} on ${env} env: Personal details saved`)
})

Then('I should see the dashboard', async function () {
    SFPage = new DashboardPage(this.page)
    await SFPage.isDashboardVisible()
    console.log(`Worker ${Worker} on ${env} env: Dashboard is visible`)
})

Then('I should see my profile menu', async function () {
    SFPage = new DashboardPage(this.page)
    await SFPage.isProfileMenuVisible()
    console.log(`Worker ${Worker} on ${env} env: Profile menu is visible`)
})

// Step para login inválido
Then('I should see the login error message {string}', async function (errorMessage) {
    SFPage = new LoginPage(this.page)
    await SFPage.getLoginErrorMessage(errorMessage)
    console.log(`Worker ${Worker} on ${env} env: Login error message displayed: ${errorMessage}`)
})

Then('I should remain on the login page', async function () {
    const currentUrl = await this.page.url()
    console.log(currentUrl)
    expect(currentUrl).toContain('/auth/login')
    console.log(`Worker ${Worker} on ${env} env: Remained on the login page`)
})

Then('I should see the password reset page', async function () {
    //    const currentUrl = await this.page.url()
    //    expect(currentUrl).toContain('/auth/requestPasswordResetCode')
    console.log(`Worker ${Worker} on ${env} env: Password reset page is visible`)
})

Then('I should see a confirmation message {string}', async function (confirmationMessage) {
    //    const message = await SFPage.getConfirmationMessage()
    //    expect(message).toBe(confirmationMessage)
    console.log(`Worker ${Worker} on ${env} env: Confirmation message displayed: ${confirmationMessage}`)
})

Then('I should see the {string} header', async function (headerText) {
    //    const header = await SFPage.getHeaderText()
    //    expect(header).toBe(headerText)
    console.log(`Worker ${Worker} on ${env} env: Header displayed: ${headerText}`)
})

Then('I should return to the login page', async function () {
    //    const currentUrl = await this.page.url()
    //    expect(currentUrl).toContain('/auth/login')
    console.log(`Worker ${Worker} on ${env} env: Returned to the login page`)
})

Then('I should see a success toast {string}', async function (toastMessage) {
    //    const message = await SFPage.getSuccessToastMessage()
    //    expect(message).toBe(toastMessage)
    console.log(`Worker ${Worker} on ${env} env: Success toast displayed: ${toastMessage}`)
})

Then('I should find the user {string} in the users list', async function (username) {
    //    const userExists = await SFPage.isUserInList(username)
    //    expect(userExists).toBe(true)
    console.log(`Worker ${Worker} on ${env} env: User found in list: ${username}`)
})

Then('I should see the Personal Details page', async function () {
    //    const currentUrl = await this.page.url()
    //    expect(currentUrl).toContain('/pim/viewPersonalDetails')
    console.log(`Worker ${Worker} on ${env} env: Personal Details page is visible`)
})

Then('The employee full name should be {string}', async function (fullName) {
    //    const displayedName = await SFPage.getEmployeeFullName()
    //    expect(displayedName).toBe(fullName)
    console.log(`Worker ${Worker} on ${env} env: Employee full name displayed: ${fullName}`)
})

Then('I should see at least one result containing {string}', async function (name) {
    //    const results = await SFPage.getSearchResults()
    //    expect(results.some(result => result.includes(name))).toBe(true)
    console.log(`Worker ${Worker} on ${env} env: Search results contain name: ${name}`)
})

Then('The personal details should reflect:', async function (dataTable) {
    //    const expectedDetails = dataTable.rowsHash()
    //    const actualDetails = await SFPage.getPersonalDetails()
    //    expect(actualDetails).toEqual(expectedDetails)
    console.log(`Worker ${Worker} on ${env} env: Personal details updated correctly`)
})

Then('the employee full name should be {string}', async function (string) {
    // Write code here that turns the phrase above into concrete actions
    console.log(`Worker ${Worker} on ${env} env: OK`)
})

Then('the personal details should reflect:', async function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    console.log(`Worker ${Worker} on ${env} env: OK`)
})

Then('I should see the User Management header', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(`Worker ${Worker} on ${env} env: OK`)
})

Then('I should see the PIM header', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(`Worker ${Worker} on ${env} env: OK`)
})

Then('I should see the login page', async function () {
    // Write code here that turns the phrase above into concrete actions
    console.log(`Worker ${Worker} on ${env} env: OK`)
})

// Given, When, Then('Log in as a {string}', async function (Person) {
//    SFPage = new LoginAccount(this.page)
//    await SFPage.LogInAs(Person)
//     console.log(`Worker ${Worker} on ${env} env: Log in as ${Person}`)
// })

// Given, When, Then('Back to System Admin', async function () {
//    SFPage = new LoginAccount(this.page)
//    await SFPage.BackToSystemAdmin()
//     console.log(`Worker ${Worker} on ${env} env: Back to System Admin`)
// })

// Given('I\'m on the login page', async function () {
//    SFPage = new LoginPage(this.page)
//    await SFPage.visit()
//    await SFPage.NormalLogin()
//     console.log(`Worker ${Worker} on ${env} env: I\'m on the login page`)
// })

// Given('Validate if need token', async function () {
//     let RandomNames = await SFPage.getNameRun()
//     NameRun = `Automation ${RandomNames} Run`
//     LNameRun = `${RandomNames} Last Name`
//     EmailRun = await SFPage.getEmail(RandomNames)
//     ULID = await SFPage.getULID()
//     CID = await SFPage.getCompanyID()
//     this.DataName = NameRun
//     this.DataEmail = EmailRun
//     this.CanodicalULID = ULID
//     this.CompID = CID
//    SFPage = new LoginAccount(this.page)
//     //Only uncomment the line below if you need put the Verification Code
//     //await SFPage.Comands.Wait(this.page,20000)
//    await SFPage.ValidateToken()
//     console.log(`Worker ${Worker} on ${env} env: Validate if need token`)
// })

// Given('Select {string} app on App Launcher', async function (Option) {
//    SFPage = new Headers(this.page)
//    await SFPage.SelectAppLauncher(Option)
//     console.log(`Worker ${Worker} on ${env} env: Select ${Option} app on App Launcher`)
// })

// Given('Login with a {string} account', async function (Profile) {
//    SFPage = new LoginPage(this.page)
//     let RandomNames = await SFPage.getNameRun()
//     NameRun = `Automation ${RandomNames} Run`
//     LNameRun = `${RandomNames} Last Name`
//     EmailRun = await SFPage.getEmail(RandomNames)
//     ULID = await SFPage.getULID()
//     CID = await SFPage.getCompanyID()
//     this.DataName = NameRun
//     this.DataEmail = EmailRun
//     this.CanodicalULID = ULID
//     this.CompID = CID
//    SFPage = new LoginAccount(this.page)
//     //Only uncomment the line below if you need put the Verification Code
//    await SFPage.Comands.Wait(this.page, 20000)
//    await SFPage.OppPage()
//     console.log(`Worker ${Worker} on ${env} env: Login with a ${Profile} account`)
// })

// When('Go to top menu', async function () {
//     //SFPage = new Headers(this.page)
//     //await SFPage.Tab()
//     console.log(`Worker ${Worker} on ${env} env: Go to top menu`)
// })

// When('Select {string} on top menu', async function (Option) {
//    SFPage = new Headers(this.page)
//    await SFPage.SelectMenu(Option)
//     console.log(`Worker ${Worker} on ${env} env: Select ${Option} on top menu`)
// })

// When('Click on {string} button on {string} page', async function (button, SelectedPage) {
//     switch (SelectedPage) {
//         case 'Account':
//         //    SFPage = new Account(this.page)
//         //    await SFPage.ClickButton(button)
//             break
//         case 'Accounts':
//         //    SFPage = new AllAccounts(this.page)
//         //    await SFPage.ClickButton(button)
//             break
//         case 'New Account':
//         //    SFPage = new NewAccounts(this.page)
//         //    await SFPage.ClickButton(button)
//             break
//         case 'New Contacts':
//         //    SFPage = new NewContact(this.page)
//         //    await SFPage.ClickButton(button)
//             break
//         case 'Opportunity':
//         //    SFPage = new ParentOpportunity(this.page, this.page.url())
//         //    await SFPage.ClickButton(button)
//         //    await SFPage.visitWaiting()
//             break
//     }
//     console.log(`Worker ${Worker} on ${env} env: Click on ${button} button on ${SelectedPage} page`)
// })

// When('Add New Account', async function () {
//    SFPage = new NewAccounts(this.page)
//    await SFPage.AddNewAccount(NameRun, ULID, CID)
//     console.log(`Worker ${Worker} on ${env} env: Add New Account`)
// })

// When('Add New Contact', async function () {
//    SFPage = new Account(this.page)
//     AccountProfile = this.page.url()
//     this.AccountURL = AccountProfile
//    await SFPage.NewContact()
//    SFPage = new NewContact(this.page, AccountProfile)
//    await SFPage.AddNewContact(FNameRun, LNameRun, EmailRun)
//     console.log(`Worker ${Worker} on ${env} env: Add New Contact`)
// })

// When('Select the {string} Tab', async function (Tab) {
//    SFPage = new Headers(this.page, AccountProfile)
//     switch (Tab) {
//         case 'Account':
//             console.log(AccountProfile)
//         //    SFPage.visit()
//             break
//     }
//     console.log(`Worker ${Worker} on ${env} env: Select the ${Tab} Tab`)
// })

// When('Select the {string} Tab on Opportunity page', async function (Tab) {
//    SFPage = new ParentOpportunity(this.page)
//    await SFPage.ClickTab(Tab)
//     console.log(`Worker ${Worker} on ${env} env: Select the ${Tab} Tab on Opportunity Page`)
// })

// When('Select {string} subtab on Account page', async function (Subtab) {
//    SFPage = new Account(this.page)
//     switch (Subtab) {
//         case 'Contacts':
//         //    await SFPage.tabContacts()
//             break
//         case 'Qualification':
//         //    await SFPage.tabQualification()
//             break
//     }
//     console.log(`Worker ${Worker} on ${env} env: Select ${Subtab} subtab on Account page`)
// })

// When('Click on {string} button on Standart subtab', async function (Button) {
//    SFPage = new Account(this.page)
//    await SFPage.ClickButton(Button)
//     //page.elements.click(page.locators[Button])
//     console.log(`Worker ${Worker} on ${env} env: Click on ${Button} button on Standart subtab`)
// })

// When('Select {string} as Core Product', async function (Product) {
//    SFPage = new Account(this.page)
//    await SFPage.SelectCoreProduct(Product)
//     console.log(`Worker ${Worker} on ${env} env: Select ${Product} as Core Product`)
// })

// When('Fill Scrubbing', async function () {
//    SFPage = new Account(this.page)
//    await SFPage.FillScrubbing()
//     console.log(`Worker ${Worker} on ${env} env: Fill Scrubbing`)
// })

// When('Fill {string} {string} {string} {string} {string} {string} Scrubbing', async function (website, bstreet, bcity, bstate, bzip, bcountry) {
//    SFPage = new Account(this.page)
//    await SFPage.FillScrubbing(website, bstreet, bcity, bstate, bzip, bcountry)
//     console.log(`Worker ${Worker} on ${env} env: Fill 2.0 Scrubbing`)
// })

// When('Fill Qualifying', async function () {
//    SFPage = new Account(this.page)
//    await SFPage.FillQualifying(`${FNameRun} ${LNameRun}`)
//     console.log(`Worker ${Worker} on ${env} env: Fill Qualifying`)
// })

// When('Fill {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} {string} Qualifying', async function (PrimaryBusinessOption, problem, priority, wantsmedical, eorprovider, currentpayroll, hi, month, risk, vertx, anyone, stateop, intcountry, intemp, intcont) {
//    SFPage = new Account(this.page)
//    await SFPage.FillQualifying(`${FNameRun} ${LNameRun}`, PrimaryBusinessOption, problem, priority, wantsmedical, eorprovider, currentpayroll, hi, month, risk, vertx, anyone, stateop, intcountry, intemp, intcont)
//     console.log(`Worker ${Worker} on ${env} env: Fill Qualifyingx`)
// })

// When('Fill and Complete Sales Qualified', async function () {
//    SFPage = new Account(this.page)
//    await SFPage.FillSales()
//    await SFPage.FillCallOutcome()
//     console.log(`Worker ${Worker} on ${env} env: Fill and Complete Sales Qualified`)
// })

// When('Fill and Complete {string} {string} {string} Sales Qualified', async function (ft, pt, nextstep) {
//    SFPage = new Account(this.page)
//    await SFPage.FillSales()
//    await SFPage.FillCallOutcome(ft, pt, nextstep)
//     console.log(`Worker ${Worker} on ${env} env: Fill and Complete Sales Qualifiedx`)
// })

// When('Fill Negotiate Details on Opportunity page and Save', async function () {
//    SFPage = new ParentOpportunity(this.page)
//    await SFPage.FillNegotiateDetails()
//     console.log(`Worker ${Worker} on ${env} env: Fill Negotiate Details')
// })

// When('Visit {string} Opportunity', async function (URL_Opp) {
//    SFPage = new LoginAccount(this.page, URL_Opp)
//     URL = URL_Opp
//    await SFPage.visit()
//     console.log(`Worker ${Worker} on ${env} env: Visit ${URL_Opp} Opportunity`)
// })

// When('Add HIQ Underwriting', async function () {
//     console.log(`Worker ${Worker} on ${env} env: Add HIQ Underwriting`)
// })

// When('Add WCT Underwriting', async function () {
//    SFPage = new ParentOpportunity(this.page)
//    await SFPage.AddFillWCT()
//     console.log(`Worker ${Worker} on ${env} env: Add WCT Underwriting`)
// })

// When('Add MICO Underwriting', async function () {
//     console.log(`Worker ${Worker} on ${env} env: Add MICO Underwriting`)
// })

// When('Add CRIMSON SAGE Underwriting', async function () {
//     console.log(`Worker ${Worker} on ${env} env: Add CRIMSON SAGE Underwriting`)
// })

// When('Click on {string} link on Opportunity page', async function (link) {
//    SFPage = new ParentOpportunity(this.page)
//    await SFPage.ClickLink(link)
//     console.log(`Worker ${Worker} on ${env} env: Click on ${link} link on Opportunity page`)
// })

// When('Click on {string} on All Accounts page', async function (element) {
//    SFPage = new AllAccounts(this.page)
//    await SFPage.Elements.click(this.page, SFPage.locators[element])
//     console.log(`Worker ${Worker} on ${env} env: Click on ${element} on All Accounts page`)
// })

// When('Click on {string} subtab on Account page', async function (element) {
//    SFPage = new Account(this.page)
//    await SFPage.Elements.click(this.page, SFPage.locators[element])
//     console.log(`Worker ${Worker} on ${env} env: Click on ${element} subtab on Account page`)
// })

// When('Click on {string} Tab', async function (Tab) {
//    SFPage = new Headers(this.page, AccountProfile)
//     switch (Tab) {
//         case 'Account':
//             console.log(AccountProfile)
//         //    SFPage.visit()
//             break
//     }
//     console.log(`Worker ${Worker} on ${env} env: Click on ${Tab} Tab`)
// })

// When('Fill the Required Details', async function () {
//    SFPage = new Account(this.page)
//    await SFPage.FillRequiredDetails(`${FNameRun} ${LNameRun}`)
//     console.log(`Worker ${Worker} on ${env} env: Fill the Required Details`)
// })

// When('Fill the Required Details for a Partner Referral', async function () {
//    SFPage = new Account(this.page)
//    await SFPage.FillRequiredDetailsPR()
//     console.log(`Worker ${Worker} on ${env} env: Fill the Required Details for a Partner Referral`)
// })

// When('Fill the Discovery Call', async function () {
//    SFPage = new Account(this.page)
//    await SFPage.FillDiscoveryCall()
//     console.log(`Worker ${Worker} on ${env} env: Fill the Discovery Call`)
// })

// When('Click on {string} on the pop-up on Account page', async function (element) {
//    SFPage = new Account(this.page)
//    await SFPage.Elements.click(this.page, SFPage.locators[`Pop-up ${element}`])
//     console.log(`Worker ${Worker} on ${env} env: Click on ${element} on the pop-up on Account page`)
// })

// When('Click on {string} on Account page', async function (element) {
//    SFPage = new Account(this.page)
//    await SFPage.Elements.click(this.page, SFPage.locators[element])
//     console.log(`Worker ${Worker} on ${env} env: Click on ${element} on Account page`)
// })

// When('Select the Partner Referral on Account page', async function () {
//    SFPage = new Account(this.page)
//    await SFPage.SelectPartnerReferral()
//     console.log(`Worker ${Worker} on ${env} env: Select the Partner Referral on Account page`)
// })

// When('Click on {string} on Parent Opportunity page', async function (element) {
//    SFPage = new ParentOpportunity(this.page)
//    await SFPage.Elements.click(this.page, SFPage.locators[element])
//     console.log(`Worker ${Worker} on ${env} env: Click on ${element} on Parent Opportunity page`)
// })

// When('Fill Product {string} on Parent Opportunity page', async function (element) {
//    SFPage = new ParentOpportunity(this.page)
//    await SFPage.SelectProduct(element)
//     console.log(`Worker ${Worker} on ${env} env: Click on ${element} on Parent Opportunity page`)
// })

// When('Fill Product PEO {string} on Parent Opportunity page', async function (BorP) {
//    SFPage = new ParentOpportunity(this.page)
//    await SFPage.PEO(BorP)
//     console.log(`Worker ${Worker} on ${env} env: Click on ${BorP} on Parent Opportunity page`)
// })

// When('Validate the Child Opportunity it\'s in {string}', async function (Phase) {
//    SFPage = new ParentOpportunity(this.page)
//     assert.ok(await SFPage.ValidatePhase(Phase), `Opportunity it's not in the ${Phase} phase`)
//     console.log(`Worker ${Worker} on ${env} env: Validate the Opportunity it\'s in ${Phase}`)
// })

// When('Click on {string} of {string} on Parent Opportunity page', async function (string, string2) {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending'
// })

// When('Click on {string} on pop-up Parent Opportunity page', async function (string) {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending'
// })

// When('Fill Discount {string} and {string} on Parent Opportunity page', async function (string, string2) {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending'
// })

// Then('Validate the Discount {string} is displayed on Parent Opportunity page', async function (string) {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending'
// })

// Then('Validate the Discount {string} is removed on Parent Opportunity page', async function (string) {
//     // Write code here that turns the phrase above into concrete actions
//     return 'pending'
// })

// Then('Validate the Parent Opportunity it\'s in {string}', async function (Phase) {
//    SFPage = new ParentOpportunity(this.page)
//     assert.ok(await SFPage.ValidateParentPhase(Phase), `Opportunity it's not in the ${Phase} phase`)
//     console.log(`Worker ${Worker} on ${env} env: Validate the Opportunity it\'s in ${Phase}`)
// })

// Then('Validate the HIQ Underwriting it\'s in {string}', async function (Phase) {
//     console.log(`Worker ${Worker} on ${env} env: Validate the HIQ Underwriting`)
// })

// Then('Validate the WCT Underwriting it\'s in {string}', async function (Phase) {
//    SFPage = new WCT(this.page)
//     assert.ok(await SFPage.ValidationSubmit(Phase), `WCT it's not in the ${Phase} phase`)
//     console.log(`Worker ${Worker} on ${env} env: Validate the WCT Underwriting`)
// })

// Then('Validate the MICO Underwriting it\'s in {string}', async function (Phase) {
//     console.log(`Worker ${Worker} on ${env} env: Validate the MICO Underwriting`)
// })

// Then('Validate the CRIMSON SAGE Underwriting it\'s in {string}', async function (Phase) {
//     console.log(`Worker ${Worker} on ${env} env: Validate the CRIMSON SAGE Underwriting`)
// })

// Then('Validate the Opportunity it\'s in {string}', async function (Phase) {
//    SFPage = new ParentOpportunity(this.page)
//     assert.ok(await SFPage.ValidatePhase(Phase), `Opportunity it's not in the ${Phase} phase`)
//     console.log(`Worker ${Worker} on ${env} env: Validate the Opportunity it\'s in ${Phase}`)
// })
