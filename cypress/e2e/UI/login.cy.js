import LoginPage from "../../support/pages/loginPage";

describe("Automation Exercise - Login Flow", () => {
    beforeEach(() => {
        LoginPage.visit();
    });

   
    it("should login successfully with valid credentials", () => {
        cy.log("Entering valid login credentials...");
        LoginPage.enterEmail("valid@example.com");
        LoginPage.enterPassword("validpassword");
        LoginPage.clickLogin();
        LoginPage.verifyLoginSuccess();
    });

    it("should not login with an invalid email", () => {
        cy.log("Entering invalid email...");
        LoginPage.enterEmail("invalid@example.com");
        LoginPage.enterPassword("validpassword");
        LoginPage.clickLogin();
        LoginPage.verifyLoginFailure(); 
    });

    it("should not login with an invalid password", () => {
        cy.log("Entering invalid password...");
        LoginPage.enterEmail("valid@example.com");
        LoginPage.enterPassword("wrongpassword");
        LoginPage.clickLogin();
        LoginPage.verifyLoginFailure();
    });

    it("should not login with empty credentials", () => {
        cy.log("Attempting login with empty fields...");
        LoginPage.clickLogin();
        LoginPage.verifyLoginFailureEmpty();
        
    });
});
