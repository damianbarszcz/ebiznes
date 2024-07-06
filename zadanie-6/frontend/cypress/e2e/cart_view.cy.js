describe('CartView Page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        cy.intercept('GET', 'http://localhost:8000/api/carts/1', {
            fixture: 'cart.json'
        }).as('getCart');

        cy.intercept('POST', 'http://localhost:8000/api/cart/make-payment', {
            statusCode: 200
        }).as('makePayment');

        cy.visit('/cart');
    });

    it('should display cart details correctly', () => {
        cy.wait('@getCart');

        cy.title().should('eq', 'Sklep Internetowy | Koszyk'); // 1

        cy.get('nav').should('be.visible'); // 2

        cy.contains('Mój koszyk').should('be.visible'); // 3

        cy.get('[data-cy="cart-item"]').should('have.length', 3); // 4

        cy.get('[data-cy="cart-item"]').each(($el) => {
            cy.wrap($el).find('[data-cy="product-name"]').should('be.visible'); // 5
        });

        cy.get('[data-cy="cart-item"]').each(($el) => {
            cy.wrap($el).find('[data-cy="product-price"]').should('be.visible'); // 6
        });

        cy.get('[data-cy="cart-item"]').each(($el) => {
            cy.wrap($el).find('[data-cy="product-count"]').should('be.visible'); // 7
        });

        cy.get('[data-cy="total-amount"]').should('be.visible'); // 8

        cy.get('[data-cy="cart-pay-button"]').should('be.visible'); // 9

        cy.get('[data-cy="cart-not-found"]').should('not.exist'); // 10

        cy.get('[data-cy="product-name"]').each(($el, index, $list) => {
            const names = ['ASUS TUF Gaming F15', 'Xiaomi Redmi Note 13', 'MSI G255PF E2'];
            cy.wrap($el).should('contain.text', names[index]); // 11
        });

        cy.get('[data-cy="product-price"]').each(($el, index, $list) => {
            const prices = ['3499 zł', '599 zł', '599 zł'];
            cy.wrap($el).should('contain.text', prices[index]); // 12
        });

        cy.get('[data-cy="product-count"]').each(($el, index, $list) => {
            const counts = ['1', '2', '1'];
            cy.wrap($el).should('contain.text', counts[index]); // 13
        });

        cy.get('[data-cy="total-amount"]').should('contain.text', '5296 zł'); // 14

        cy.get('[data-cy="cart-pay-button"]').click();
        cy.wait('@makePayment').its('response.statusCode').should('eq', 200); // 15

        cy.contains('Płatność została poprawnie dokonana!').should('be.visible'); // 16

        cy.intercept('GET', 'http://localhost:8000/api/carts/1', {
            fixture: 'empty_cart.json'
        }).as('getEmptyCart');
        cy.visit('/cart');
        cy.wait('@getEmptyCart');
        cy.get('[data-cy="cart-not-found"]').should('be.visible'); // 17

        cy.contains('Twój koszyk jest pusty.').should('be.visible'); // 18

        cy.get('[data-cy="cart-item"]').should('not.exist'); // 19

        cy.get('[data-cy="cart-pay-button"]').should('not.exist'); // 20
    });
});