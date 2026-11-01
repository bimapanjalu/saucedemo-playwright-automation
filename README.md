<div align="center">

# SauceDemo — Playwright Automation

**Automated smoke tests for authentication, cart behavior, and checkout.**

`Playwright` `TypeScript` `Node.js` `GitHub Actions`

</div>

---

## Overview

This repository contains a small browser automation suite for the public SauceDemo practice application. The tests are designed to be readable, repeatable, and useful as a starting point for a junior QA portfolio.

The suite covers core user journeys. It is not a complete regression suite and does not establish security, performance, accessibility, or cross-browser conformance.

## Test coverage

- Valid login reaches the product list.
- Invalid login is rejected with a visible message.
- A locked-out demo account is denied access.
- A product can be added to the cart.
- A user can complete the demo checkout workflow.

Test behavior depends on the current demo application. If the provider changes the interface or test credentials, update the test setup and document the reason.

## Requirements

- Node.js LTS (use a currently supported version).
- npm.
- Network access to `https://www.saucedemo.com/`.
- A machine on which Playwright can install and run Chromium.

## Setup

From this repository folder:

```bash
npm install
npx playwright install chromium
```

## Run tests

```bash
npm test
```

Run with the browser visible:

```bash
npm run test:headed
```

Open the HTML report after a run:

```bash
npm run report
```

Playwright creates the report locally. Do not commit generated reports or screenshots until you review them for personal data and confirm they are useful evidence.

## Configuration

The default base URL is the public demo site. To use a permitted alternate environment, set `BASE_URL` before running the suite.

PowerShell:

```powershell
$env:BASE_URL = "https://www.saucedemo.com"
npm test
```

macOS / Linux:

```bash
BASE_URL=https://www.saucedemo.com npm test
```

Use only environments you own or are authorized to test.

## Continuous integration

The workflow at `.github/workflows/playwright.yml` installs dependencies, installs Chromium, and runs the suite on pushes and pull requests. The CI job is a repeatability mechanism; a green run means the included tests passed in that specific CI run, not that the application is defect-free.

## Test design notes

- Locators use the demo application's `data-test` attributes where available.
- Assertions verify visible user-facing outcomes.
- Tests create their own browser context through Playwright's test runner.
- Credentials are demo credentials, not personal secrets.
- The tests do not bypass authentication or attack the service.

## Evidence and maintenance

After the first successful run, record:
- Date and commit tested.
- Node.js and Playwright versions.
- Test count and actual outcome.
- Any flaky or blocked tests.
- Link to the CI run, if public.

If a test fails, first determine whether the failure is caused by a real behavior change, test data, timing, network, or a changed demo interface. Do not label every automation failure as an application defect.

## Structure

```text
.
├── README.md
├── package.json
├── playwright.config.ts
├── tests/
│   ├── auth.spec.ts
│   └── checkout.spec.ts
└── .github/
    └── workflows/
        └── playwright.yml
```
