describe("Reqres API Tests", () => {
    beforeEach(() => {
        cy.log("Starting a new test...");
    });

    it("should return a list of users", () => {
        cy.request({
            method: "GET",
            url: "/api/users?page=2"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.be.an("array").that.is.not.empty;
        });
    });

    it("should return a single user", () => {
        cy.request({
            method: "GET",
            url: "/api/users/2"
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.data).to.have.property("id", 2);
        });
    });

    it("should return 404 for a non-existent user", () => {
        cy.request({
            method: "GET",
            url: "/api/users/999",
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it("should create a new user", () => {
        cy.request({
            method: "POST",
            url: "/api/users",
            body: {
                name: "John Doe",
                job: "QA Engineer"
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property("name", "John Doe");
            expect(response.body).to.have.property("job", "QA Engineer");
        });
    });

    it("should register a user successfully", () => {
        cy.request({
            method: "POST",
            url: "/api/register",
            body: {
                email: Cypress.env("userEmail"),
                password: Cypress.env("userPassword")
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("token");
        });
    });

    it("should return 400 when registering without a password", () => {
        cy.request({
            method: "POST",
            url: "/api/register",
            body: {
                email: Cypress.env("userEmail")
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body).to.have.property("error", "Missing password");
        });
    });
});