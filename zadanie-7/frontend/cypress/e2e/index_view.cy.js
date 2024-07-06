describe('IndexView Page', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);

        cy.intercept('GET', 'http://localhost:8000/api/products', {
            fixture: 'products.json'
        }).as('getProducts');

        cy.intercept('POST', 'http://localhost:8000/api/cart/add-to-cart', {
            statusCode: 200
        }).as('addToCart');

        cy.visit('/');
    });

    it('should display the navigation bar', () => {
        cy.get('nav').should('be.visible')
        cy.get('nav').within(() => {
            cy.get('a').should('have.length', 2); // 1
            cy.contains('Strona główna').should('be.visible'); // 2
            cy.contains('Koszyk').should('be.visible'); // 3
        });
    });

    it('should display the title "Polecane produkty"', () => {
        cy.contains('Polecane produkty').should('be.visible'); // 4
    });

    it('should load products from API and display them with names and prices', () => {
        cy.wait('@getProducts');
        cy.get('[data-cy="product-item"]').should('have.length', 8); // 5
        cy.get('[data-cy="product-item"]').each(($el) => {
            cy.wrap($el).within(() => {
                cy.get('[data-cy="product-name"]').should('be.visible'); // 6
                cy.get('[data-cy="product-price"]').should('be.visible'); // 7
                cy.get('[data-cy="product-img"]').should('be.visible'); // 8
                cy.get('a').should('have.attr', 'href').and('include', '/product/'); // 9
            });
        });
    });

    it('should display "Brak dostępnych produktów." when no products are available', () => {
        cy.intercept('GET', 'http://localhost:8000/api/products', {
            fixture: 'no_products.json'
        }).as('getNoProducts');

        cy.visit('/');
        cy.wait('@getNoProducts');
        cy.get('[data-cy="products-not-found"]').should('be.visible'); // 10
        cy.contains('Brak dostępnych produktów.').should('be.visible'); // 11
    });

    it('should add a product to the cart and show a success message', () => {
        cy.wait('@getProducts');
        cy.get('[data-cy="add-to-cart-button"]').first().click();
        cy.wait('@addToCart');
        cy.contains('Produkt został dodany do koszyka!').should('be.visible'); // 12
    });

    it('should correctly calculate the total amount', () => {
        cy.wait('@getProducts');
        cy.get('[data-cy="product-item"]').first().within(() => {
            cy.get('[data-cy="product-price"]').then($price => {
                const priceText = $price.text().replace(' zł', '');
                const priceValue = parseFloat(priceText);
                expect(priceValue).to.be.greaterThan(0); // 13
            });
        });
    });

    it('should display product images with correct alt text', () => {
        cy.wait('@getProducts');
        cy.get('[data-cy="product-item"]').each(($el) => {
            cy.wrap($el).find('[data-cy="product-img"]').should('have.attr', 'alt').and('not.be.empty'); // 14
        });
    });

    it('should navigate to product detail page when product is clicked', () => {
        cy.wait('@getProducts');
        cy.get('[data-cy="product-item"]').first().find('a').click();
        cy.url().should('include', '/product/'); // 15
    });

    it('should display the correct title', () => {
        cy.title().should('eq', 'Sklep Internetowy | Strona główna'); // 16
    });

    it('should have functioning navigation links', () => {
        cy.get('nav').within(() => {
            cy.get('a').first().click();
            cy.url().should('eq', Cypress.config().baseUrl + '/'); // 17
            cy.get('a').last().click();
            cy.url().should('include', '/cart'); // 18
        });
    });

    it('should display navigation links with correct text', () => {
        cy.get('nav').within(() => {
            cy.get('a').first().should('contain', 'Strona główna'); // 19
            cy.get('a').last().should('contain', 'Koszyk'); // 20
        });
    });
});