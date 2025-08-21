@auth @smoke
Feature: Autenticação no OrangeHRM
  As a user
  I want to log in to OrangeHRM
  So that I can access the dashboard

  Background:
    Given I am on the OrangeHRM login page

  @positive
  Scenario: Login válido com credenciais de administrador
    When I log in with username "Admin" and password "admin123"
    Then I should see the dashboard
    And I should see my profile menu

  @negative
  Scenario Outline: Login inválido
    When I log in with username "<username>" and password "<password>"
    Then I should see the login error message "Invalid credentials"
    And I should remain on the login page
    Examples:
      | username | password  |
      | Admin    | wrongpass |
      | Unknown  | admin123  |
      |          | admin123  |
      | Admin    |           |