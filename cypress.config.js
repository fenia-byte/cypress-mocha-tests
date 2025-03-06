const { defineConfig } = require("cypress");
require("dotenv").config(); // Load environment variables

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || "https://reqres.in",
    env: {
      userEmail: process.env.USER_EMAIL,
      userPassword: process.env.USER_PASSWORD
    },
    specPattern: "cypress/e2e/**/*.cy.js"
  }
});
