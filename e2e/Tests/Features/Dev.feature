@Dev @skip
Feature: Development Testing

  
  Scenario: Scenario Creation with System Admin
    Given I'm on the login page
    And Validate if need token
    When Log in as a "Gabriel Nobrega"
    And Select "Accounts" on top menu
    And Click on "New Button" on All Accounts page
    And Add New Account
    And Click on "Contacts" subtab on Account page
    And Add New Contact
    And Click on "Account" Tab
    And Click on "Create New QL Button" subtab on Account page
    And Click on "Qualification Subtab" subtab on Account page
    And Fill the Required Details
    And Click on "Discovery Call Subtab" subtab on Account page
    And Fill the Discovery Call
    And Click on "Convert Button" subtab on Account page
    And Click on "Convert Button" on the pop-up on Account page
    And Back to System Admin
    And Click on "View Opportunity Button" on Account page
    Then Validate the Parent Opportunity it's in "Pre-Pipe"

  @skip
  Scenario: Scenario Creation as AE
    Given I'm on the login page
    And Validate if need token
    When Select "Accounts" on top menu
    And Click on "New Button" on All Accounts page
    And Add New Account
    And Log in as a "Charles Corke"
    And Click on "Contacts" subtab on Account page
    And Add New Contact
    And Click on "Account" Tab
    And Click on "Create New QL Button" subtab on Account page
    And Click on "Qualification Subtab" subtab on Account page
    And Fill the Required Details
    And Click on "Discovery Call Subtab" subtab on Account page
    And Fill the Discovery Call
    And Click on "Convert Button" subtab on Account page
    And Click on "Convert Button" on the pop-up on Account page
    And Click on "View Opportunity Button" on Account page
    Then Validate the Parent Opportunity it's in "Pre-Pipe"
  
  @skip
  Scenario: TS001 - Validate Parent Opportunity in Pre-Pipe Phase
    Given I'm on the login page
    And Validate if need token
    And Select "Justworks Sales" app on App Launcher
    When Select "Accounts" on top menu
    And Click on "New Button" on All Accounts page
    And Add New Account
    And Click on "Contacts" subtab on Account page
    And Add New Contact
    And Click on "Account" Tab
    And Click on "Create New QL Button" subtab on Account page
    And Click on "Qualification Subtab" subtab on Account page
    And Fill the Required Details
    And Click on "Discovery Call Subtab" subtab on Account page
    And Fill the Discovery Call
    And Convert Lead
    And Click on "View Opportunity Button" on Account page
    Then Validate the Parent Opportunity it's in "Pre-Pipe"