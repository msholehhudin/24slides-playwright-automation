# OrangeHRM UI Automation Testing

UI automation testing project built with **Playwright, Cucumber, and TypeScript** against the OrangeHRM demo application.

The project demonstrates a **Behavior-Driven Development (BDD)** approach to UI test automation using Cucumber feature files, Page Object Model (POM), environment-based credentials, test reporting, Playwright traces, and parallel test execution.

> **Note:** This project was originally developed as part of a QA Automation / SDET technical assessment. The assessment process has since concluded, but the project is maintained as a demonstration of UI automation practices and learning.

---

## 🎯 Project Objective

The objective of this project is to automate core user flows in the OrangeHRM application and demonstrate a maintainable UI automation framework.

The automation focuses on:

- Authentication
- Employee search
- Employee search reset
- Employee details navigation
- Employee creation
- Negative search scenarios
- Invalid authentication

The project also demonstrates how automated tests can be organized using **BDD + Page Object Model**.

---

## 🛠️ Tech Stack

| Technology      | Purpose                           |
| --------------- | --------------------------------- |
| **TypeScript**  | Programming language              |
| **Playwright**  | Browser automation and assertions |
| **Cucumber.js** | BDD test framework                |
| **ts-node**     | TypeScript execution              |
| **dotenv**      | Environment variable management   |
| **Node.js**     | Runtime                           |
| **npm**         | Package management                |

### Main Dependencies

```text
@playwright/test
@cucumber/cucumber
typescript
ts-node
dotenv
```

---

## 🏗️ Project Structure

```text
task-1/
│
├── features/
│   ├── login.feature
│   └── employee.feature
│
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── EmployeePage.ts
│
├── step-definitions/
│   ├── login-steps.ts
│   └── employee-steps.ts
│
├── support/
│   ├── hooks.ts
│   └── world.ts
│
├── playwright.config.ts
├── cucumber.js
├── tsconfig.json
├── package.json
├── .env
├── .gitignore
└── README.md
```

---

## 🧩 Architecture

The project follows a layered structure:

```text
Feature Files
     │
     ▼
Step Definitions
     │
     ▼
Page Objects
     │
     ▼
Playwright
     │
     ▼
OrangeHRM Application
```

### Feature Files

Feature files contain the business-readable scenarios.

Example:

```gherkin
Scenario: User can search for an employee
    Given I am logged in to OrangeHRM
    When I search for employee "sholeh"
    Then I should see employee "sholeh" in the search results
```

The feature files intentionally describe **what the user wants to accomplish**, rather than how the browser performs each action.

---

### Step Definitions

Step definitions connect the Gherkin scenarios to the automation implementation.

For example:

```typescript
When(
  "I search for employee {string}",
  async function (this: CustomWorld, employeeName: string) {
    this.employeePage = new EmployeePage(this.page);

    await this.employeePage.gotoEmployeeList();
    await this.employeePage.searchEmployee(employeeName);
  },
);
```

The `{string}` parameter allows the same step definition to be reused with different employee names.

For example:

```gherkin
When I search for employee "Emily"
```

or:

```gherkin
When I search for employee "Sholeh"
```

Both use the same step definition.

---

## 📦 Page Object Model

The project uses the **Page Object Model (POM)** to separate UI interaction logic from test scenarios.

### LoginPage

Responsible for:

- Opening the login page
- Entering username
- Entering password
- Clicking Login
- Verifying login error messages

Example:

```typescript
async login(username: string, password: string) {
  await this.page.getByPlaceholder("Username").fill(username);

  await this.page.getByPlaceholder("Password").fill(password);

  await this.page.getByRole("button", { name: "Login" }).click();
}
```

---

### DashboardPage

Responsible for verifying that authentication successfully navigated the user to the dashboard.

Example:

```typescript
async verifyDashboardIsDisplayed() {
  await expect(this.page).toHaveURL(/dashboard/);

  await expect(
    this.page.getByRole("heading", { name: "Dashboard" }),
  ).toBeVisible();
}
```

The test does not need to know the exact implementation details of the dashboard assertion.

---

### EmployeePage

Responsible for employee-related operations such as:

- Navigating to Employee List
- Searching for employees
- Resetting search
- Opening employee details
- Adding an employee
- Verifying search results
- Verifying empty search results

This keeps employee-specific selectors and interactions inside a single reusable class.

---

## 🧪 Test Scenarios

The project covers the following core user flows.

### Authentication

#### 1. Administrator logs in with valid credentials

**Expected result:**

The user successfully logs in and is redirected to the OrangeHRM dashboard.

---

#### 2. Administrator cannot log in with invalid credentials

**Expected result:**

The application remains on the login page and displays:

```text
Invalid credentials
```

This provides negative-path coverage for authentication.

---

### Employee Management

#### 3. User can search for an employee

**Expected result:**

The searched employee appears in the employee table.

---

#### 4. User can reset employee search

**Expected result:**

After clicking Reset, the employee search field is cleared.

---

#### 5. User can view employee details

**Expected result:**

Selecting an employee from the search results opens the employee's personal details page.

---

#### 6. User can add a new employee

**Expected result:**

A valid employee can be created successfully through the employee creation form.

---

#### 7. User sees no results when searching for a non-existing employee

**Expected result:**

The application displays:

```text
No Records Found
```

This validates the application's behavior when the search returns no matching employees.

---

## 🔐 Environment Configuration

Credentials are stored outside the source code using environment variables.

Example `.env`:

```env
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=your-password
```

The `.env` file is excluded from Git using `.gitignore`.

Example:

```gitignore
.env
node_modules/
test-results/
playwright-report/
cucumber-report.html
```

### Why?

Credentials and other secrets should never be committed to a public repository.

The test accesses the credentials through:

```typescript
process.env.ORANGEHRM_USERNAME;
process.env.ORANGEHRM_PASSWORD;
```

This makes the test configuration easier to change between environments without modifying the test implementation.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd task-1
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Create a `.env` file:

```env
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=your-password
```

---

## ▶️ Running the Tests

### Run all Cucumber scenarios

```bash
npm test
```

or:

```bash
npm run test
```

---

### Run tests in parallel

The project can execute scenarios using Cucumber's parallel execution:

```bash
npm run test:parallel
```

The current configuration uses:

```bash
cucumber-js --parallel 3
```

This allows up to three scenarios to execute concurrently.

Parallel execution is useful for reducing total regression execution time, particularly as the test suite grows.

---

### TypeScript Type Checking

TypeScript can be checked without generating JavaScript files:

```bash
npx tsc --noEmit
```

A successful result with no output indicates that TypeScript compilation checks passed.

---

## 📊 Test Reporting

Cucumber provides a test report after execution.

The report contains information such as:

- Features
- Scenarios
- Steps
- Passed/failed status
- Execution duration
- Hooks
- Test execution summary

Example:

```text
6 scenarios (6 passed)
20 steps (20 passed)
```

The report can be used to quickly identify which scenario or step failed.

---

## 🎥 Playwright Trace

Playwright tracing is enabled for failed/retried executions through the Playwright configuration.

A trace can contain:

- Screenshots
- Browser actions
- DOM snapshots
- Network information
- Timing information
- Video, depending on the trace configuration/environment

The Playwright Trace Viewer is particularly useful for investigating failures that cannot be easily reproduced from terminal output alone.

Typical debugging workflow:

```text
Test fails
    ↓
Open trace
    ↓
Inspect action
    ↓
Inspect screenshot / DOM
    ↓
Identify failure
    ↓
Fix selector / synchronization / test logic
```

---

## 🔎 Locator Strategy

The project prioritizes semantic Playwright locators where possible.

Examples:

```typescript
page.getByRole("button", { name: "Login" });
```

```typescript
page.getByPlaceholder("Username");
```

```typescript
page.getByPlaceholder("Password");
```

```typescript
page.getByRole("heading", { name: "Dashboard" });
```

This approach is generally more maintainable than relying heavily on generated CSS classes or framework-specific attributes.

For example, instead of:

```typescript
page.locator(".oxd-button.oxd-button--secondary");
```

the test can use:

```typescript
page.getByRole("button", { name: "Search" });
```

where the accessible role and name are stable.

---

## 🧪 Test Data Considerations

The OrangeHRM instance used by this project is a **public demo environment**.

Because the environment is shared and externally managed:

- Employee records can change.
- Test data may be modified or removed.
- The application may occasionally respond slowly.
- Multiple users may interact with the same environment.
- Authentication or navigation may occasionally experience transient delays.

For this reason, test data should not be assumed to remain permanently available in a shared demo environment.

Where possible, the test suite uses employee creation and controlled test data to reduce dependency on pre-existing records.

---

## ⚡ Parallel Execution Considerations

Parallel execution provides faster overall test execution, but it also introduces additional considerations.

Each Cucumber scenario receives its own test context and browser state through the test hooks.

Conceptually:

```text
Scenario 1 ──► Browser Context 1
Scenario 2 ──► Browser Context 2
Scenario 3 ──► Browser Context 3
```

This helps prevent scenarios from unintentionally sharing browser state.

However, tests that modify shared application data should be designed carefully when running in parallel.

For example, creating employees with the same username or relying on a specific mutable record can introduce test-data collisions.

---

## 🧠 Key QA Practices Demonstrated

This project demonstrates several important automation practices:

### 1. Behavior-driven scenarios

Tests are written in Gherkin so that expected behavior is understandable independently of the implementation.

### 2. Page Object Model

UI interactions are separated from test scenarios.

### 3. Reusable step definitions

Parameterized steps such as:

```gherkin
When I search for employee "Emily"
```

allow the same automation logic to be reused with different test data.

### 4. Positive and negative testing

The suite validates both successful and unsuccessful user flows.

### 5. Environment-based configuration

Credentials are externalized using `.env`.

### 6. Semantic locators

Playwright's role, label, and placeholder locators are preferred where appropriate.

### 7. Automated assertions

The tests validate actual application behavior instead of simply performing browser actions.

### 8. Parallel execution

Cucumber scenarios can be executed concurrently to reduce regression execution time.

### 9. Trace-based debugging

Playwright traces provide additional evidence when investigating automation failures.

---

## 🚧 Known Limitations

This project uses a public demo application, so test stability can be affected by external factors outside the automation framework.

Known limitations include:

- Shared test data
- Dynamic employee records
- Occasional slow responses
- Temporary login/navigation delays
- Changes to the demo application's data
- Potential conflicts when modifying shared records

These limitations are important when interpreting failures.

A failure does not always indicate an automation defect; it may also indicate an environment or test-data issue.

---

## 📈 Possible Improvements

If this project were developed further, possible improvements would include:

- CI/CD integration using GitHub Actions
- Automatic test execution on pull requests
- Better test-data management
- Unique generated employee test data
- Improved retry strategy for transient failures
- Environment-specific configuration
- Tagging scenarios by regression/smoke category
- More detailed reporting
- API-based test-data setup and cleanup
- Cross-browser execution in CI
- Containerized test execution
- Test result history and trend reporting

---

## 💡 What I Learned

Through this project, I practiced:

- Building a Playwright automation framework from scratch
- Using Cucumber with TypeScript
- Designing BDD scenarios
- Implementing Page Object Model
- Creating reusable parameterized Cucumber steps
- Handling authentication through environment variables
- Writing positive and negative UI tests
- Selecting reliable Playwright locators
- Debugging strict-mode locator violations
- Investigating synchronization and timeout issues
- Using Playwright Trace Viewer
- Generating and reading Cucumber test reports
- Running tests in parallel
- Thinking about test-data reliability and isolation

---

## 📌 Project Status

**Task 1 — UI Automation: Completed**

The current project contains automated coverage for core OrangeHRM authentication and employee-management flows.

The remaining API automation and video-demonstration requirements from the original assessment are **not included in this repository** because the assessment process concluded before those tasks were submitted.

---

## 👤 Author

**Muhammad Sholehhudin**

Fullstack Developer transitioning toward QA Automation / SDET-focused engineering.

### Technical Interests

- Playwright
- Cucumber / BDD
- TypeScript
- JavaScript
- API Automation
- Test Automation
- Frontend Engineering
- CI/CD

---

## 📄 Disclaimer

OrangeHRM is used as a publicly available demo application for automation practice.

This project is intended for **educational and portfolio purposes** and is not affiliated with or endorsed by OrangeHRM.
