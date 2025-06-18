# 📘 Bookstore API Automation with Playwright + TypeScript

This project implements end-to-end API test automation for a FastAPI-based bookstore using Playwright and TypeScript.

## 🚀 Getting Started

### ▶️ Start the FastAPI Server
```bash
uvicorn main:app --reload
```

### ▶️ Run the Tests
```bash
npm install
npx playwright test
npx playwright show-report
```

## ✅ Test Coverage
- Create Book (valid and invalid inputs)
- Get Book by ID and list
- Update Book with valid and invalid payloads
- Delete Book (valid and invalid ID)
- Request chaining
- Header, payload, and status validation

## 🔁 CI/CD with GitHub Actions
CI runs on every push to `main`. It installs dependencies, runs all tests, and uploads the report.
