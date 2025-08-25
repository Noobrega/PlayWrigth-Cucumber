@pim @regression @skip
Feature: Buscar funcionário (PIM)
    As an HR admin
    I want to search an existing employee
    So that I can view or edit their details

    Background:
        Given I am logged in as "Admin" with password "admin123"
        And I navigate to the "PIM" section

    Scenario Outline: Buscar por nome
        When I search employees by name "<name>"
        Then I should see at least one result containing "<name>"
        And I can open the first result to view details
        Examples:
            | name    |
            | Gabriel |
            | Maria   |
