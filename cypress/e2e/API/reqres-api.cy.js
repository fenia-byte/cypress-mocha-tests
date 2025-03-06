describe("GET API Tests", () => {
  it("should return a list of users", () => {
      cy.request({
          method: "GET",
          url: "https://reqres.in/api/users?page=2"
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.have.length.greaterThan(0);
      });
  });

  it("should return a single user", () => {
      cy.request({
          method: "GET",
          url: "https://reqres.in/api/users/2"
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.data).to.have.property("id", 2);
      });
  });
});

it("should return 404 for a non-existent user", () => {
  cy.request({
      method: "GET",
      url: "https://reqres.in/api/users/999",
      failOnStatusCode: false
  }).then((response) => {
      expect(response.status).to.eq(404);
  });
});

describe("POST API Tests", () => {
  it("should create a new user", () => {
      cy.request({
          method: "POST",
          url: "https://reqres.in/api/users",
          body: {
              name: "John Doe",
              job: "QA Engineer"
          }
      }).then((response) => {
          expect(response.status).to.eq(201);
          expect(response.body).to.have.property("name", "John Doe");
      });
  });

  it("should register a user successfully", () => {
      cy.request({
          method: "POST",
          url: "https://reqres.in/api/register",
          body: {
              email: "eve.holt@reqres.in",
              password: "pistol"
          }
      }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.have.property("token");
      });
  });
});

it("should return 400 when registering without a password", () => {
  cy.request({
      method: "POST",
      url: "https://reqres.in/api/register",
      body: {
          email: "eve.holt@reqres.in"
      },
      failOnStatusCode: false
  }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("error", "Missing password");
  });
});