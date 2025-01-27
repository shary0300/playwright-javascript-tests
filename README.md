# Playwright JavaScript Automation Project

## Project Structure

```
playwright-javascript-betsson-automation/
├── page-objects/
│   ├── AddToCartPage.js       # Page object for cart actions
│   ├── BasePage.js            # Page object for common actions
│   ├── CheckoutPage.js        # Page object for checkout actions
│   └── LoginPage.js           # Page object for login functionality
├── tests/
│   ├── ui/
│   │   ├── AddToCart.spec.js      # Test case for adding items to cart
│   │   ├── Checkout.spec.js       # Test case for checkout process
│   │   ├── E2EProductPurchase.spec.js # End-to-end product purchase tests
│   │   └── LoginTest.spec.js      # Test case for login functionality
│   ├── api/
│       ├── AddNewPet.spec.js      # API test case for adding a new pet
│       ├── E2EPetFlow.spec.js     # End-to-end pet API flow
│       └── GetPet.spec.js         # API test case for fetching pet details
├── test-data/
│   ├── api/
│   │   ├── AddPetBody.json        # Request body for adding pets
│   │   ├── endpoints.json         # API endpoints
│   │   └── headers.json           # Common API headers
│   ├── frontEnd/
│       ├── urls.json              # URL data for UI tests
│       └── users.json             # User credentials for login tests
├── utils/
│   ├── getRequest.js              # Utility for making GET requests
│   └── postRequest.js             # Utility for making POST requests
├── playwright.config.js           # Playwright configuration file
├── playwright-ci.yml              # CI configuration
├── package.json                   # Project dependencies and scripts
├── .gitignore                     # Git ignore file
├── README.md                      # Project documentation
└── test-results/                  # Test execution results
```

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:
   ```bash
   cd <project_directory>
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

---

## Running Tests

### Run All Tests
To execute all tests in the project:
```bash
npx playwright test
```

### Run Specific Test File
To execute a specific test file (e.g., `E2EProductPurchase.spec.js`):
```bash
npx playwright test tests/ui/E2EProductPurchase.spec.js
```

### UI Tests
To run the UI test suite using the Chrome browser:
```bash
npm run chrome-ui-tests
```

### API Tests
To run the API test suite:
```bash
npm run chrome-api-tests
```

---

## Architectural Pattern
This project follows a modular and maintainable architecture using the following principles:

- **Page Object Model (POM):**
  - Each page in the application has a corresponding page object file in the `page-objects/` directory, encapsulating actions and locators.

- **Test Data Management:**
  - Centralized test data stored in the `test-data/` directory for both UI and API tests.
  - Ensures easy updates and separation of test logic from data.

- **Playwright Framework:**
  - Provides fast, reliable, and cross-browser automation support.

- **Modular Design:**
  - Individual test cases for UI and API are organized into separate files in the `tests/` directory.
  - Reusable utility functions stored in the `utils/` directory.

- **Git Version Control:**
  - Tracks changes and supports collaborative development.

- **JavaScript (Node.js):**
  - Lightweight and widely-used language for automation projects.

---

## Key Features

- **Headless/Headful Modes:**
  - Run tests in headless mode for CI or headful mode for debugging.

- **Continuous Integration (CI):**
  - Configured for CI pipelines using `playwright-ci.yml`.

- **Reporting:**
  - Test results are automatically generated in the `test-results/` directory.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

