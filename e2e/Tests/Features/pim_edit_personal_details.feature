@pim @regression
Feature: Editar dados pessoais do funcionário
    As an HR admin
    I want to update personal details
    So that employee records stay accurate

    Background:
        Given I am logged in as "Admin" with password "admin123"
        And I navigate to the "PIM" section

    Scenario Outline: Atualizar dados básicos
        Given I open employee "<name>" from search results
        When I edit personal details with:
            | Nickname     | <nick>      |
            | Other ID     | <otherId>   |
            | Driver's Lic | <driverLic> |
        And I save personal details
        Then I should see a success toast "Successfully Updated"
        And the personal details should reflect:
            | Nickname     | <nick>      |
            | Other ID     | <otherId>   |
            | Driver's Lic | <driverLic> |
        Examples:
            | name    | nick   | otherId | driverLic   |
            | Gabriel | GabsQA | 99012   | BR-123-XY99 |
