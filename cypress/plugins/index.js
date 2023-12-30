const TestRailReporter = require('cypress-testrail');

//Check README.md on https://github.com/boxblinkracer/cypress-testrail for details
module.exports = (on, config) => {
    new TestRailReporter(on, config).register();
    return config
}