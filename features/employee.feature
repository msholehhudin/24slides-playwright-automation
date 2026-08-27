Feature: Employee Management

  As an administrator
  I want to search for employees
  So that I can quickly find employee information

Scenario: User can search for an employee
    Given I am logged in to OrangeHRM
    When I search for employee "Emily"
    Then I should see employee "Emily" in the search results