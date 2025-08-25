@smoke @navigation @skip
Feature: Navegação básica pós-login
    As a user
    I want to access common modules
    So that I confirm the app is up

    Background:
        Given I am logged in as "Admin" with password "admin123"

    Scenario: Acessar Dashboard
        Then I should see the dashboard

    Scenario: Acessar PIM
        When I navigate to the "PIM" section
        Then I should see the PIM header

    Scenario: Acessar Admin
        When I navigate to the "Admin" section
        Then I should see the User Management header
