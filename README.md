# 🚀 Playwright POM Framework

## 📌 Overview

This repository contains a Playwright Automation Framework built using modern QA automation practices.

The framework includes:

* UI Automation
* API Testing
* Page Object Model (POM)
* Hooks & Reporting
* Environment Configuration
* Cross-browser Testing

---

# 🛠 Tech Stack

* Playwright
* TypeScript
* Node.js
* Git & GitHub
* VS Code

---

# 📂 Project Structure

```bash
PLAYWRIGHT-POM-PROJECT/
│
├── api/
│   ├── base.client.ts
│   └── user.client.ts
│
├── model/
│   └── user.model.ts
│
├── pages/
│   ├── BasePage.ts
│   ├── DashboardPage.ts
│   └── LoginPage.ts
│
├── tests/
│   ├── api/
│   │   └── user.spec.ts
│   │
│   └── Login.spec.ts
│
├── utils/
│   └── testData.ts
│
├── playwright-report/
├── test-results/
│
├── .env
├── .gitignore
├── package.json
├── playwright.config.ts
└── README.md
```

---

# ✨ Features Implemented

## ✅ UI Automation

* Login functionality testing
* Dashboard validation
* Assertions & validations
* Cross-browser execution

## ✅ API Testing

* GET Request
* POST Request
* PUT Request
* DELETE Request
* Response validation

## ✅ Framework Features

* Page Object Model (POM)
* beforeEach & afterEach hooks
* HTML Reporting
* Screenshot on failure
* Trace Viewer
* Environment variables
* Parallel execution

---

# ▶️ Installation

```bash
npm install
```

---

# ▶️ Run Tests

## Run All Tests

```bash
npx playwright test
```

## Run API Tests

```bash
npx playwright test tests/api
```

## Open HTML Report

```bash
npx playwright show-report
```

---

# 🌐 Supported Browsers

* Chromium
* Firefox
* WebKit

---

# 👨‍💻 Author

### Dhyey Chauhan

Aspiring QA Automation Engineer
Focused on Playwright Automation & Framework Development
