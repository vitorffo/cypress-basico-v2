describe('Central de Atendimento ao CLiente TAT', function() {

    beforeEach(function (){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function (){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName')
            .type('Vitor Fernando')

        cy.get('#lastName')
            .type('Oliveira')

        cy.get('#email')
            .type('fernandofernandesvitor@gmail.com')

        cy.get('#open-text-area')
            .type('No one can help me anymore')

        cy.contains('.button', 'Enviar').click()

        cy.get('.dfdfmbsdm,fb')
            .should('be.visible')
    })

    it('EXTRA 1 - preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('#firstName')
            .type('Vitor Fernando', { delay: 0})

        cy.get('#lastName')
            .type('Oliveira', { delay: 0})

        cy.get('#email')
            .type('fernandofernandesvitor@gmail.com', { delay: 0})

        cy.get('#open-text-area')
            .type('No one can help me anymore', { delay: 0})

        cy.contains('.button', 'Enviar').click()

        cy.get('.success')
            .should('be.visible')
    })

    it('EXTRA 2 - exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName')
            .type('Vitor Fernando')

        cy.get('#lastName')
            .type('Oliveira')

        cy.get('#email')
            .type('fernandofernandesvitorgmail.com')

        cy.get('#open-text-area')
            .type('No one can help me anymore')

        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('EXTRA 3 - Telefone só aceita numeros', function () {
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')

    })

    it('EXTRA 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#firstName')
            .type('Vitor Fernando')

        cy.get('#lastName')
            .type('Oliveira')

        cy.get('#email')
            .type('fernandofernandesvitorgmail.com')

        cy.get('#open-text-area')
            .type('No one can help me anymore')

        cy.get('#phone-checkbox').check()

        cy.contains('.button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('EXTRA 5 - preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        const nome = 'Vitor'
        const sobrenome = 'Oliveira'
        const email = 'fernandofernandesvitorgmail.com'
        const text = 'No one can help me anymore'

        cy.get('#firstName')
            .type(nome)
            .should('have.value', nome)
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type(sobrenome)
            .should('have.value', sobrenome)
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type(email)
            .should('have.value', email)
            .clear()
            .should('have.value', '')

        cy.get('#open-text-area')
            .type(text)
            .should('have.value', text)
            .clear()
            .should('have.value', '')
    })
    
    it('EXTRA 6 - exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('.button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('EXTRA 7 - envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('EXTRA 1 - seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })

    it('EXTRA 2 - seleciona um produto (Blog) por seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('EXTRA 1 - marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).check().should('be.checked')
            })
    })

    it('EXTRA 2 - marca ambos checkboxes, depois desmarca o ultimo', function () {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })
    
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('EXTRA 1 - seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    
    it('EXTRA 2 - seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')

        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy  > a').should('have.attr', 'target', '_blank')
    })

    it('EXTRA 1 - acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
        cy.get('#privacy  > a').invoke('removeAttr', 'target')
            .should('not.have.attr', 'target')
    })

    it('EXTRA 1 - acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
        cy.get('#privacy  > a').invoke('removeAttr', 'target')
            .click()
    })

    it('EXTRA 2 - testa a página da política de privavidade de forma independente', function () {
        cy.get('#privacy  > a').invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
            .should('exist')
    })


})