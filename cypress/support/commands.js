Cypress.Commands.add('fillMandatoryFildsAndSubmit', dataCustomer => {

    cy.get('input[name="firstName"]').should('be.visible').type(dataCustomer.nome)
    cy.get('input[name="lastName"]').should('be.visible').type(dataCustomer.sobrenom)
    cy.get('input[id="email"]').should('be.visible').type(dataCustomer.emaill)
    cy.get('#open-text-area').should('be.visible').type(dataCustomer.text, { delay: 0 })
    cy.get('button[type="submit"]').click()
})