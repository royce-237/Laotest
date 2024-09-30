describe('Search Home Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display homes on load', () => {
    cy.get('li').should('have.length.greaterThan', 0);
  });

  it('should filter homes by name', () => {
    cy.get('input[placeholder="Search..."]').type('culpa');
    cy.get('li').each(($el) => {
      cy.wrap($el).contains('culpa');
    });
  });

  it('should display all homes when search input is cleared', () => {
    cy.get('input[placeholder="Search..."]').type('some name');
    cy.get('input[placeholder="Search..."]').clear();
    cy.get('li').should('have.length.greaterThan', 0);
  });
});