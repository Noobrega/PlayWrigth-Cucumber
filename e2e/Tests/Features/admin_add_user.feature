@admin @regression @skip
Feature: Criar usuário no módulo Admin
    As a system admin
    I want to create a system user
    So that they can access OrangeHRM

    Background:
        Given I am logged in as "Admin" with password "admin123"
        And I navigate to the "Admin" section

    Scenario Outline: Criar usuário do sistema com perfil ESS
        When I open "User Management" and click "Add"
        And I fill the system user form:
            | User Role    | ESS        |
            | Employee     | <empName>  |
            | Status       | Enabled    |
            | Username     | <username> |
            | Password     | <password> |
            | Confirm Pass | <password> |
        And I save the system user
        Then I should see a success toast "Successfully Saved"
        And I should find the user "<username>" in the users list
        Examples:
            | empName | username     | password     |
            | Gabriel | qa.gabriel   | P@ssw0rd123! |
            | Maria   | maria.olivei | P@ssw0rd123! |
