Feature: OrangeHRM Login

  As an administrator
  I want to log into OrangeHRM
  So that I can access the dashboard

  Scenario: Administrator logs in with valid credentials
    Given I am on the OrangeHRM login page
    When I log in with valid administrator credentials
    Then I should see the OrangeHRM dashboard

  Scenario: Administrator cannot log in with invalid credentials
    Given I am on the OrangeHRM login page
    When I log in with invalid credentials
    Then I should see the login error message