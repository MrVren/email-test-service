const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000,
  viewportHeight: 1080,
  viewportWidth: 1920,

  /*
  Go to https://cloud.cypress.io/ and open a project.
  In the left menu click on 'Project Settings' and put your projectID here

  Run locally with cloud features:
  npx cypress run --record --key ea785246-bae4-47d7-bbfa-18453f5b084a
  */
  projectId: '8ny8q4',
  e2e: {
    baseUrl: 'https://app.picsello.com',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config) //testrail reporter
    },
  },
});

