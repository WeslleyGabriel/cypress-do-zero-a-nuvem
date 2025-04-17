//describe é o nosso bloco de testes
//it é a nossa suite de testes
//beforeEach executa como sempre antes de cada suite 'it' iniciar o teste, garante sempre que a página será visitada antes da suite começar
describe('Central de Atendimento ao Cliente TAT', () => {

  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 20)
  const userData = {
    firstName: 'Weslley',
    lastName: 'Gabriel',
    email: 'gabriel@hotmail.com',
    phone: '83988771166',
    emailError: 'gabrielTesting',
    description: 'Gostei desse teste, acredito que vai passar facilmente!!!'
  }

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia formulário', () => {

    cy.get('input[name="firstName"]').should('be.visible').type(userData.firstName)
    cy.get('input[name="lastName"]').should('be.visible').type(userData.lastName)
    cy.get('input[id="email"]').should('be.visible').type(userData.email)
    cy.get('input[id="phone"]').should('be.visible').type(userData.phone)
    cy.get('#open-text-area').should('be.visible').type(longText)

   
    cy.get('input[name="firstName"]').should('have.value', userData.firstName)
    cy.get('input[name="lastName"]').should('have.value', userData.lastName)
    cy.get('input[id="email"]').should('have.value', userData.email)
    cy.get('input[id="phone"]').should('have.value', userData.phone)
    cy.get('#open-text-area').should('have.value', longText)

   
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{

      
      cy.get('input[name="firstName"]').should('be.visible').type(userData.firstName)
      cy.get('input[name="lastName"]').should('be.visible').type(userData.lastName)
      cy.get('input[id="email"]').should('be.visible').type(userData.emailError)
      cy.get('input[id="phone"]').should('be.visible').type(userData.phone)
      cy.get('#open-text-area').should('be.visible').type(userData.description, { delay: 0 })
  
    
      cy.get('input[name="firstName"]').should('have.value', userData.firstName)
      cy.get('input[name="lastName"]').should('have.value', userData.lastName)
      cy.get('input[id="phone"]').should('have.value', userData.phone)
      cy.get('#open-text-area').should('have.value', userData.description)
  
      
      cy.get('button[type="submit"]').click()
      cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio do formulário', () =>{

   
    cy.get('input[name="firstName"]').should('be.visible').type(userData.firstName)
    cy.get('input[name="lastName"]').should('be.visible').type(userData.lastName)
    cy.get('input[id="email"]').should('be.visible').type(userData.email)
    cy.get('#open-text-area').should('be.visible').type(userData.description, { delay: 0 })
    cy.get('#phone-checkbox').click()

  
    cy.get('input[name="firstName"]').should('have.value', userData.firstName)
    cy.get('input[name="lastName"]').should('have.value', userData.lastName)
    cy.get('#open-text-area').should('have.value', userData.description)

    
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
})

it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

  cy.get('input[name="firstName"]').should('be.visible').type(userData.firstName).should('have.value', userData.firstName).clear()
  cy.get('input[name="lastName"]').should('be.visible').type(userData.lastName).should('have.value', userData.lastName).clear()
  cy.get('input[id="email"]').should('be.visible').type(userData.email).should('have.value', userData.email).clear()
  cy.get('input[id="phone"]').should('be.visible').type(userData.phone).should('have.value', userData.phone).clear()
  cy.get('#open-text-area').should('be.visible').type(userData.description, { delay: 0 })

 
  cy.get('input[name="firstName"]').should('have.value', '')
  cy.get('input[name="lastName"]').should('have.value', '')
  cy.get('input[id="email"]').should('have.value','')
  cy.get('input[id="phone"]').should('have.value', '')
 
  cy.get('button[type="submit"]').click()

})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
 
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')

})

it.only('envia o fomrulario com sucesso usando um comando customer', () => {
  const dataCustomer = {
    nome: 'wes',
    sobrenom: 'gabs',
    emaill: 'gabrielk@hoit.com',
    text: 'nakujdniuandiuansiu'
  }

  cy.fillMandatoryFildsAndSubmit(dataCustomer)
  cy.get('.success').should('be.visible')

})

  

})