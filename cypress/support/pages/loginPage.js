class LoginPage {
    visit() {
        cy.visit("https://www.automationexercise.com/login");
    }

    enterEmail(email) {
        cy.get('input[data-qa="login-email"]').should("be.visible").type(email);
    }

    enterPassword(password) {
        cy.get('input[data-qa="login-password"]').should("be.visible").type(password);
    }

    clickLogin() {
        cy.get('[data-qa="login-button"]').click();
    }

    verifyLoginSuccess() {
        cy.log("Checking if login was successful...");

        cy.get("body").then(($body) => {
            if ($body.find("a[href='/logout']").length > 0) {
                cy.log("✅ Login successful!");
                cy.get("a[href='/logout']").should("be.visible");
                cy.url().should("not.include", "/login");
            } else {
                cy.log("❌ Login failed! Checking error message...");
                this.verifyLoginFailure(); // Calls failure method if login fails
            }
        });
    }

    verifyLoginFailure() {
        cy.get(".login-form p", { timeout: 5000 }).should(
            "contain",
            "Your email or password is incorrect!"
        );
    }

    verifyLoginFailureEmpty() {
        cy.get(".login-form p", { timeout: 5000 }).should('not.exist')
    }
}

export default new LoginPage();
