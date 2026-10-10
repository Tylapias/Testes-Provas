describe('Questao 2 - Carregamento dinamico', () => {
  it('aguarda o Loading desaparecer e exibe Hello World!', () => {
    cy.visit('https://the-internet.herokuapp.com/dynamic_loading/1');

    cy.get('#start button').click();

    cy.get('#loading').should('be.visible');
    cy.get('#loading', { timeout: 15000 }).should('not.be.visible');

    cy.get('#finish h4')
      .should('be.visible')
      .and('have.text', 'Hello World!');
  });
});
