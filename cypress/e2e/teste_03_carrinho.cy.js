describe('Questao 3 - Carrinho de compras', () => {
  it('exibe 2 no icone do carrinho apos adicionar 3 produtos e remover 1', () => {
    cy.visit('https://www.saucedemo.com/');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.url().should('include', '/inventory.html');

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    cy.get('.shopping_cart_badge').should('have.text', '3');

    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();

    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '2');
  });
});
