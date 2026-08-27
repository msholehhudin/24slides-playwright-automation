Feature: Employee Management

  As an administrator
  I want to manage employee information
  So that I can efficiently maintain and access employee records

Scenario: User can search for an employee
    Given I am logged in to OrangeHRM
    When I search for employee "sholeh"
    Then I should see employee "sholeh" in the search results

Scenario: User can reset employee search
  Given I am logged in to OrangeHRM
  When I search for employee "sholeh"
  And I reset the employee search
  Then the employee search field should be empty

Scenario: User can view employee details
  Given I am logged in to OrangeHRM
  When I search for employee "sholeh"
  And I open the employee details for "sholeh"
  Then I should see the employee details page

Scenario: User can add a new employee
  Given I am logged in to OrangeHRM
  When I add a new employee with valid information
  Then the employee should be successfully created