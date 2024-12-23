Here's a more tailored **README** for your project, `epicbet-playwright-tests`, that reflects your use of Playwright with TypeScript for automated testing of the **EpicBet** application. I’ve included specific details regarding your testing setup and how others can use it.

---

# EpicBet Playwright Tests

This repository contains automated tests using **Playwright** with **TypeScript** to test the **EpicBet** application. The tests cover functionality such as search and UI interactions, ensuring that the application works as expected across different browsers.

## Table of Contents
- [Getting Started](#getting-started)
- [Running the Test Cases](#running-the-test-cases)
- [Project Structure](#project-structure)
- [Test Case Descriptions](#test-case-descriptions)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v16 or higher recommended)
- **npm** or **yarn**
- **Playwright** dependencies for browser automation.

### Install Dependencies
First, clone the repository:
```bash
git clone https://github.com/shary0300/epicbet-playwright-tests.git
cd epicbet-playwright-tests
```

Then, install the necessary dependencies:
```bash
npm install
```

or use `yarn` if you prefer:
```bash
yarn install
```

Additionally, you will need to install Playwright's browser binaries:
```bash
npx playwright install
```

This will install all the required browsers (Chromium, Firefox, and WebKit) for testing.

## Running the Test Cases

You can run the test cases using the following npm scripts.

### Run All Tests in the Chrome Browser
To run all the UI tests in **Google Chrome**:
```bash
npm run chrome-ui-tests
```

### Run Tests in All Supported Browsers
To run the tests in all supported browsers (Chromium, Firefox, WebKit), run:
```bash
npx playwright test
```

This will execute all the tests and generate a report.

### Run Specific Tests
To run a specific test file, use:
```bash
npx playwright test path/to/test-file.spec.ts
```

For example, to run the search functionality tests:
```bash
npx playwright test tests/ui/searchFunc.spec.ts
```

## Project Structure

The project structure is organized as follows:

```
epicbet-playwright-tests/
├── page-objects/
│   ├── commonPage.ts            # Page object for common actions
│   └── liveSportsPage.ts       # Page object for search functionality
│   └── searchFuncModal.ts       # Page object for search functionality
│   └── sportsPage.ts       # Page object for search functionality
├── tests/
│   └── ui/
│       ├── liveOdds.spec.ts   # Test case for search functionality
│       ├── searchFunc.spec.ts   # Test case for search functionality
│       ├── sports.spec.ts   # Test case for search functionality
├── test-data/
│   ├── urls.json               # URL data for tests
│   └── teams.json              # Team names used in search tests
├── playwright.config.ts         # Playwright configuration file
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

### Key Folders and Files:
- **`page-objects/`**: Contains TypeScript files that represent different pages of the application. These files encapsulate the interactions with various elements of the page.
- **`tests/`**: Contains the test scripts, organized by test types (e.g., UI tests).
- **`test-data/`**: Contains the test data files, such as URLs and teams, that are used in your tests.
- **`playwright.config.ts`**: Configuration file for Playwright, where you can customize the browsers, timeout settings, and other configurations for your tests.
- **`package.json`**: Manages dependencies, scripts, and metadata for the project.

## Test Case Descriptions

### Search Functionality Test (`searchFunc.spec.ts`)

- **Purpose**: Tests the search functionality of the EpicBet application to ensure that users can successfully search for teams using the search modal.
- **Test Steps**:
  - Navigate to the homepage.
  - Click the search button to open the search modal.
  - For each team in the test data, input the team name into the search field.
  - Validate that the search result matches the expected result for the team.

### Other Tests
Additional tests will be added for different functionalities such as UI interactions, data validations, and edge cases.

## Contributing

We welcome contributions to this repository! If you’d like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Implement your changes and test them.
4. Submit a pull request with a clear description of your changes.

---

### Next Steps:
- **Testing**: You can now run the test suite using Playwright to verify that the EpicBet application is functioning as expected across multiple browsers.
- **Customizing Tests**: You can add more tests or modify the existing ones to test new features or fix any issues.
- **Contributing**: Feel free to fork the project and contribute with additional test cases or improvements.
