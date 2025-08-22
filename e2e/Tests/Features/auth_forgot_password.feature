@auth @regression
Feature: Recuperação de senha
    As a user who forgot the password
    I want to request a password reset
    So that I can recover my access

    Background:
        Given I am on the OrangeHRM login page

    Scenario: Abrir fluxo de "Forgot your password?"
        When I click "Forgot your password?" on Login page
        Then I should see the password reset page

    Scenario: Solicitar reset com usuário existente
        Given I am on the password reset page
        When I request a password reset for username "Admin"
        Then I should see a confirmation message "Reset Password link sent successfully"
