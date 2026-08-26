# SauceDemo Playwright Automation

Automated end-to-end tests for the [SauceDemo](https://www.saucedemo.com/) sample e-commerce site, built with [Playwright Test](https://playwright.dev/) and TypeScript.

## Overview

This project covers key user flows on SauceDemo, including:

- Login (valid, invalid, locked-out user)
- Product listing and sorting
- Add/remove items from cart
- Checkout flow (information, overview, confirmation)
- Logout

## Tech Stack

- [Playwright Test](https://playwright.dev/docs/intro) — test runner and browser automation
- TypeScript
- Node.js

## Project Structure

```
.
├── tests/
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   ├── cart.spec.ts
│   └── checkout.spec.ts
├── pages/                 # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── playwright.config.ts
├── package.json
└── README.md
```

> Adjust this tree to match your actual folder layout.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

## Installation

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests in headed mode (see the browser):

```bash
npx playwright test --headed
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

Run tests in debug mode:

```bash
npx playwright test --debug
```

## Viewing the Test Report

After a test run, view the HTML report:

```bash
npx playwright show-report
```

## Test Users

SauceDemo provides several standard test accounts (password for all: `secret_sauce`):

| Username                | Behavior                          |
|-------------------------|------------------------------------|
| `standard_user`         | Normal login flow                  |
| `locked_out_user`       | Login blocked                      |
| `problem_user`          | UI/behavior glitches                |
| `performance_glitch_user` | Slow responses                   |
| `error_user`            | Triggers errors during checkout    |
| `visual_user`           | Visual/layout differences          |

## Configuration

Key settings live in `playwright.config.ts`, including:

- Base URL: `https://www.saucedemo.com`
- Browsers: Chromium, Firefox, WebKit
- Retries, timeouts, and reporter settings
- Screenshot/video capture on failure

## CI/CD

If you're running this in CI (e.g., GitHub Actions), add a badge and note here once configured:

```bash
npx playwright test --reporter=github
```

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-test`)
3. Commit your changes
4. Open a pull request

## License

[MIT](LICENSE)
