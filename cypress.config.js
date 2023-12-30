const { defineConfig } = require("cypress");

module.exports = defineConfig({
  /*
  Go to https://cloud.cypress.io/ and open a project.
  In the left menu click on 'Project Settings' and put your projectID here
  */
  projectId: '8ny8q4',
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config) //testrail reporter
    },
  },
});
