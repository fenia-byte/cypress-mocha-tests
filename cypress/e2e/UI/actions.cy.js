describe('Login Test', () => {
  it('should log in successfully', () => {
      cy.visit('https://www.automationexercise.com/login');
      cy.get('input[name="email"]').type('test@example.com');
      cy.get('input[name="password"]').type('password123');
      cy.get('button[type="submit"]').click();
      cy.contains('Logout').should('be.visible');
  });
});