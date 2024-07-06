describe('ProductView Page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        cy.intercept('GET', 'http://localhost:8000/api/products/1', {
            fixture: 'product.json'
        }).as('getProduct');

        cy.visit('/product/1');
    });

    it('should display product details correctly', () => {
        cy.wait('@getProduct');

        cy.title().should('include', 'Produkt -'); // 1

        cy.get('nav').should('be.visible'); // 2

        cy.get('span').contains('Xiaomi Redmi Note 13').should('be.visible'); // 3

        cy.get('span').contains('599 zł').should('be.visible'); // 4

        cy.get('[data-cy="product-img"]').should('be.visible'); // 5

        cy.get('[data-cy="product-img"]').should('have.attr', 'alt', 'Xiaomi Redmi Note 13'); // 6

        cy.get('[data-cy="product-img"]').should('have.attr', 'src').and('include', './images/products/xiaomi_redmi_note_13.png'); // 7

        cy.get('[data-cy="single-product"]').should('be.visible'); // 8

        cy.get('[data-cy="single-product"]').contains('Xiaomi Redmi Note 13').should('be.visible'); // 9

        cy.get('[data-cy="single-product"]').contains('599 zł').should('be.visible'); // 10
    });
});