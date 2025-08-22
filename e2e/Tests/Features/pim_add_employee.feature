@pim @smoke
Feature: Cadastrar funcionário (PIM)
    As an HR admin
    I want to add a new employee
    So that their record exists in PIM

    Background:
        Given I am logged in as "Admin" with password "admin123"
        And I navigate to the "PIM" section

    Scenario Outline: Criar novo funcionário com dados mínimos
        When I click "Add Employee" on PIM page
        And I fill the employee form with:
            | First Name | <first> |
            | Last Name  | <last>  |
        And I save the employee
        Then I should see the Personal Details page
        And the employee full name should be "<first> <last>"
        Examples:
            | first   | last     |
            | Gabriel | Santana  |
            | Maria   | Oliveira |
