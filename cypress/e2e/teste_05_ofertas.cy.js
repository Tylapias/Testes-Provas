describe('Questao 5 - Ofertas abaixo de $20 no SauceDemo', () => {
  it('lista os produtos que custam menos de $20.00', () => {
    cy.visit('https://www.saucedemo.com/');

    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    cy.get('.inventory_item').should('have.length.greaterThan', 0);

    cy.get('.inventory_item').then(($itens) => {
      const produtos = [...$itens].map((item) => ({
        nome: item.querySelector('.inventory_item_name').innerText.trim(),
        preco: parseFloat(
          item.querySelector('.inventory_item_price').innerText.replace('$', '')
        ),
      }));

      const ofertas = produtos.filter((produto) => produto.preco < 20);

      cy.task('log', `Total de produtos: ${produtos.length}`);
      cy.task('log', 'Produtos abaixo de $20.00:');
      ofertas.forEach((produto) => {
        cy.task('log', `${produto.nome} - $${produto.preco.toFixed(2)}`);
      });

      cy.writeFile('cypress/results/ofertas.json', ofertas);

      expect(ofertas.length).to.be.greaterThan(0);
      ofertas.forEach((produto) => {
        expect(produto.preco).to.be.lessThan(20);
      });
    });
  });
});
