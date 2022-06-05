it('EXTRA 2 - testa a página da política de privavidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing')
        .should('exist')
})