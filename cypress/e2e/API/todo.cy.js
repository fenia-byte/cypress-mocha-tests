describe('API Test - Get Users', () => {
  it('should return a list of users', () => {
      cy.request('GET', 'https://jsonplaceholder.typicode.com/users')
          .its('status')
          .should('eq', 200);
  });
});