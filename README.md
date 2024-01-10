# Universal Template for Automated Tests

## Requirements
Ensure that the following software versions are installed for successful test execution:
- NodeJS version 20 and above
- Cypress version 13 and above

## Installation
1. Clone the repository on your local machine.
2. Navigate to the project directory using the command line or terminal.
3. Execute the following command:
`$ npm install`

## Running Tests Locally
To run tests locally, use the following command:

`$ npx cypress run`

## Description
- Custom commands for interacting with third-party services can be found in the `./cypress/support/commands.js` file.
- Tests are located in the `./cypress/e2e/` directory.

Many variables in the tests are environment variables, allowing you to run tests with values different from the defaults. To do this, specify the `--env` argument and the corresponding values when running the tests. For example:

`$ npx cypress run --env user_host=example.com, inboxId=123`

You can check the list of all environment variables and their default values in the `./cypress.env.json` file.
