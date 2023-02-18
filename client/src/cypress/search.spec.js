describe('Search Functionality', () => {
    it('should allow users to search and view results', () => {
      cy.visit('/search');
      cy.get('input').type('React');
      cy.get('button').click();
      cy.get('ul').should('contain', 'React');
    });
  });