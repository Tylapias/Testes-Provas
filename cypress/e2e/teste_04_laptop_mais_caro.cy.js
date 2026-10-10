describe('Questao 4 - Laptop mais caro no Demoblaze', () => {
  Cypress.on('uncaught:exception', () => false);

  it('extrai nome e preco do laptop mais caro e valida que o preco e maior que 0', () => {
    cy.intercept('POST', '**/bycat').as('porCategoria');

    cy.visit('https://www.demoblaze.com/');

    cy.contains('#itemc', 'Laptops').click();
    cy.wait('@porCategoria');

    cy.contains('#tbodyid .card-title a', 'MacBook air').should('be.visible');

    cy.get('#tbodyid .card').then(($cards) => {
      const produtos = [...$cards].map((card) => ({
        nome: card.querySelector('.card-title a').innerText.trim(),
        preco: parseFloat(
          card.querySelector('h5').innerText.replace('$', '').trim()
        ),
      }));

      const maisCaro = produtos.reduce((atual, proximo) =>
        proximo.preco > atual.preco ? proximo : atual
      );

      cy.task('log', `Laptop mais caro: ${maisCaro.nome} - $${maisCaro.preco}`);
      cy.log(`Laptop mais caro: ${maisCaro.nome} - $${maisCaro.preco}`);

      expect(maisCaro.preco).to.be.greaterThan(0);
    });
  });
});
