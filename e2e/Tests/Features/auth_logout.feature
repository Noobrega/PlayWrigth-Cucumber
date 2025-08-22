@auth @smoke
Feature: Logout
    As a logged user
    I want to log out
    So that I can end my session securely

    Background:
        Given I am logged in as "Admin" with password "admin123"

    Scenario: Logout pelo menu de usuário
        When I open the user menu
        And I click "Logout" on Dashboard Page
        Then I should see the login page
        Then I should return to the login page
