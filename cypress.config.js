const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://www.automationexercise.com",
    env: {
      apiBaseUrl: "https://reqres.in",
      uiBaseUrl: "https://www.automationexercise.com",
      userEmail: process.env.USER_EMAIL,
      userPassword: process.env.USER_PASSWORD
    },
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      if (config.specPattern.includes("api-tests")) {
        config.baseUrl = config.env.apiBaseUrl;
      } else if (config.specPattern.includes("ui-tests")) {
        config.baseUrl = config.env.uiBaseUrl;
      }
      return config;
    },
    supportFile: "cypress/support/e2e.js",
    video: false,
  }
});
