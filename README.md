SauceDemo Playwright Automation Tests

Automated end-to-end tests for SauceDemo using Playwright and TypeScript.

📌 Overview

This project demonstrates UI automation testing for the SauceDemo web application. It covers common e-commerce user flows such as logging in, browsing products, adding items to the cart, and completing a checkout.

The project is intended for learning and demonstrating best practices in Playwright test automation.

🛠️ Tech Stack
Playwright — End-to-end browser automation
TypeScript — Programming language
Node.js / npm — Runtime and package management
SauceDemo — Application under test
📂 Project Structure
.
├── tests/
│   ├── login.spec.ts
│   ├── products.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md


Update the file names above to match the actual structure of your project.

🚀 Getting Started
Prerequisites

Make sure you have the following installed:

Node.js
npm
Git
Installation

Clone the repository:

git clone <your-repository-url>
cd <your-project-folder>


Install the project dependencies:

npm install


Install the Playwright browsers:

npx playwright install

▶️ Running the Tests

Run all tests:

npx playwright test


Run tests in headed mode:

npx playwright test --headed


Run a specific test file:

npx playwright test tests/login.spec.ts


Run tests using a specific browser:

npx playwright test --project=chromium

📊 Test Reports

After a test run, open the Playwright HTML report with:

npx playwright show-report


The report provides information about passed and failed tests, execution time, screenshots, traces, and other debugging details.

🧪 Test Scenarios

The automation suite can cover scenarios including:

User login with valid credentials
Login validation with invalid credentials
Product listing and sorting
Adding products to the cart
Removing products from the cart
Verifying cart contents
Checkout information
Completing an order
Verifying successful checkout
User logout
🔐 Test Credentials

SauceDemo provides test accounts that can be used for automation.

Example:

Username: standard_user
Password: secret_sauce


For additional test users and scenarios, refer to the SauceDemo application.

⚙️ Configuration

Playwright configuration is managed through:

playwright.config.ts


Typical configuration options include:

Base URL
Browser projects
Test timeout
Retries
Parallel execution
Screenshots
Video recording
Trace collection
HTML reporting
🐞 Debugging

Run tests with the Playwright Inspector:

npx playwright test --debug


Run with tracing enabled through the Playwright configuration or use the trace viewer to investigate failed tests.

📈 Future Improvements

Possible improvements for this project include:

Implementing the Page Object Model (POM)
Adding API testing
Adding more negative test scenarios
Improving test data management
Adding CI/CD integration
Running tests across multiple browsers
Adding test tags for smoke and regression suites
Improving reporting and test artifacts
🤝 Contributing

Contributions and suggestions are welcome. Feel free to fork the repository, create a feature branch, and submit a pull request.

📄 License

This project is intended for educational and demonstration purposes.
