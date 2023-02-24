describe('User Registration and Login', () => {
    it('should register a new user and log in successfully', () => {
      cy.visit('/register');
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="email"]').type('john.doe@example.com');
      cy.get('input[name="password"]').type('Password123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/profile');
    });
  });