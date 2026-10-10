describe('Questao 1 - Mensagem de erro no login', () => {
  it('exibe a mensagem correta e o balao com a classe error', () => {
    cy.visit('https://the-internet.herokuapp.com/login');

    cy.get('button[type="submit"]').click();

    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!');

    cy.get('#flash').should('have.class', 'error');
  });
});
