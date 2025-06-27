
# 📘 Bookstore API Automation Framework

## Overview

This project provides a robust API automation framework for testing a FastAPI-based bookstore backend using **Playwright** and **TypeScript**. It validates key RESTful endpoints (CRUD) with extensive coverage, integrates with **GitHub Actions** for CI/CD, and generates detailed **HTML reports**.

---

## Table of Contents

* [Features](#features)
* [Project Structure](#project-structure)
* [Tech Stack](#tech-stack)
* [Setup & Configuration](#setup--configuration)
* [How to Run Tests](#how-to-run-tests)
* [Reporting](#reporting)
* [Test Coverage](#test-coverage)
* [CI/CD Integration](#cicd-integration)

---

## Features

* Full CRUD testing for Bookstore API (Create, Read, Update, Delete)
* Positive and negative test scenarios
* Request chaining for dynamic test flows
* Modular and reusable Playwright test structure
* Type-safe validation with TypeScript
* Environment-based configuration using `.env`
* HTML reporting using Playwright’s built-in reporter
* GitHub Actions-based CI/CD pipeline

---

# 📘 Bookstore API Automation Framework

This is a robust and scalable **API test automation framework** built using [**Playwright**](https://playwright.dev/), [**TypeScript**](https://www.typescriptlang.org/), and [**Node.js**](https://nodejs.org/).

---

## 📂 Project Structure

```bash
bookstore-api-tests/
├── .github/workflows/ci.yml      # GitHub Actions CI Pipeline
├── tests/
│   ├── auth.spec.ts              # Signup and login tests
│   ├── createBook.spec.ts        # Create book with and without token
│   ├── getBook.spec.ts           # Read book by ID
│   ├── updateBook.spec.ts        # Update existing book
│   ├── deleteBook.spec.ts        # Delete book scenarios
│   ├── createWithToken.spec.ts   # Token-based creation test
│   └── utils/
│       ├── authHelper.ts         # Signup and login utilities
│       ├── assertHelper.ts       # Reusable assertions
│       └── testData.ts           # Valid and invalid payloads
├── .env                          # Environment config (e.g., BASE_URL)
├── playwright.config.ts          # Playwright test configuration
├── package.json                  # Project metadata and scripts
└── tsconfig.json                 # TypeScript compiler config
```

---

## Tech Stack

| Tool             | Purpose                            |
|------------------|------------------------------------|
| **Playwright**   | API test execution engine          |
| **TypeScript**   | Strongly-typed test scripting      |
| **FastAPI**      | Backend API under test             |
| **Node.js**      | JavaScript runtime                 |
| **Dotenv**       | Environment variable management    |
| **GitHub Actions** | CI/CD pipeline automation       |

---

## Setup & Configuration

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/bookstore-api-playwright.git
cd bookstore-api-playwright
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env` file at the root with:

```env
BASE_URL=http://localhost:8000
```

Ensure your FastAPI server is running:

```bash
uvicorn main:app --reload
```

---

## How to Run Tests

### ▶️ Run All Tests

```bash
npx playwright test
```

### ▶️ Show HTML Report

```bash
npx playwright show-report
```

---

## Reporting

After each run, an interactive HTML report is available:

```bash
npx playwright show-report
```

The report includes:

- Total tests passed/failed/skipped
- Request/response logs
- Test duration
- Clear visibility into failing steps

---

## Test Coverage

| Operation         | Covered Scenarios                   |
|-------------------|-------------------------------------|
| **POST /books**   | Valid/Invalid Create Book           |
| **GET /books**    | List and Get Book by ID             |
| **PUT /books/{id}** | Valid/Invalid Update Book        |
| **DELETE /books/{id}** | Valid/Invalid Delete Book    |
| **Request Chaining** | Create → Use ID in Update/Delete |
| **Validation**    | Headers, Status, Response Body      |

---

## CI/CD Integration

GitHub Actions pipeline (`.github/workflows/ci.yml`) includes:

- Node setup and dependency install
- Running Playwright tests
- Report generation and upload (as artifact)

Trigger: Runs on every push to `main`.

---

Peace! Happy Coding!!

---
