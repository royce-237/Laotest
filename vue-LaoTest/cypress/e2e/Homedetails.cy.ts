describe('Home Details Page', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      const homeData = [
        {
          id: 1,
          name: 'Beautiful House',
          price: 5000,
          available: true,
          description: 'A lovely house in the city.',
          image: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          name: 'Cozy Cottage',
          price: 3000,
          available: false,
          description: 'A cozy cottage in the woods.',
          image: 'https://via.placeholder.com/150'
        }
      ];
      win.localStorage.setItem('homeData', JSON.stringify(homeData));
    });

    cy.visit('http://localhost:5173/home-details/1');
  });

  it('should display home details', () => {
    cy.get('img').should('have.attr', 'src', 'https://via.placeholder.com/150');
    cy.contains('Name : Beautiful House').should('be.visible');
    cy.contains('Price : $5000').should('be.visible');
    cy.contains('Available : Yes').should('be.visible');
    cy.contains('Description : A lovely house in the city.').should('be.visible');
  });

  it('should allow editing the name', () => {
    cy.contains('Pencil').first().click();
    cy.get('input').clear().type('Updated House');
    cy.contains('Save').click();

    cy.contains('Name : Updated House').should('be.visible');
  });

  it('should allow editing the price', () => {
    cy.contains('Pencil').eq(1).click();
    cy.get('input').clear().type('6000');
    cy.contains('Save').click();

    cy.contains('Price : $6000').should('be.visible');
  });

  it('should allow editing the availability', () => {
    cy.contains('Pencil').eq(2).click();
    cy.get('input').clear().type('false');
    cy.contains('Save').click();

    cy.contains('Available : No').should('be.visible');
  });

  it('should allow editing the description', () => {
    cy.contains('Pencil').last().click();
    cy.get('input').clear().type('An updated lovely house.');
    cy.contains('Save').click();

    cy.contains('Description : An updated lovely house.').should('be.visible');
  });

  it('should navigate back to the previous page', () => {
    cy.contains('ArrowLeftIcon').click();
    cy.url().should('not.include', '/home-details/1');
  });
});