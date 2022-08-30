/// <reference types="cypress" />

describe('Login Commands', () => {

  const expectedMessage = "Credenciais inválidas, tente novamente!"

  it('deve logar com sucesso', () => {

    const user = {
      name: 'Cassio',
      instagram: '@cassio',
      password: '123456'
    }

    cy.login(user)
    cy.title().should('include', 'Qtruck | Food Trucks na sua cidade')
    cy.loggedUserValidator(user.name)
  })


  it('não deve logar com senha inválida', () => {
    const user = {
      name: 'Cassio',
      instagram: '@cassio',
      password: '1234567'
    }
    cy.login(user)
    cy.modalMessageValidator(expectedMessage)
  })


  it('não deve logar com instagram inexistente', () => {
    const user = {
      name: 'Cassio',
      instagram: '@cassio.damacena',
      password: '123456'
    }
    cy.login(user)
    cy.modalMessageValidator(expectedMessage)
  })

  it('deve validar campo obrigatório "instagram"', () => {
    const user = {
      name: 'Cassio',
      instagram: '',
      password: '123456'
    }
    cy.login(user)
    cy.modalMessageValidator('Por favor, informe o seu código do Instagram!')
  })

  it('deve validar campo obrigatório "password"', () => {
    const user = {
      name: 'Cassio',
      instagram: '@cassio',
      password: ''
    }
    cy.login(user)
    cy.modalMessageValidator('Por favor, informe a sua senha secreta!')
  })

  it('deve validar "credenciais não informadas"', () => {
    const user = {
      name: 'Cassio',
      instagram: '',
      password: ''
    }
    cy.login(user)
    cy.modalMessageValidator('Por favor, informe suas credenciais!')
  })

})

//** MESMOS TESTES UTILIZANDO PADRÃO PAGE OBJECTS */

import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

describe.only('Login Page Objects', () => {

  const expectedMessage = "Credenciais inválidas, tente novamente!"

  it('deve logar com sucesso', () => {

    const user = {
      name: 'Cassio',
      instagram: '@cassio',
      password: '123456'
    }

    loginPage.go()
    loginPage.form(user)
    loginPage.submit()

    cy.title().should('include', 'Qtruck | Food Trucks na sua cidade')
    mapPage.loggedUserValidator(user.name)
  })


  it('não deve logar com senha inválida', () => {
    const user = {
      name: 'Cassio',
      instagram: '@cassio',
      password: '1234567'
    }
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText(expectedMessage)
  })


  it('não deve logar com instagram inexistente', () => {
    const user = {
      name: 'Cassio',
      instagram: '@cassio.damacena',
      password: '123456'
    }
    cy.login(user)
    loginPage.modal.haveText(expectedMessage)
  })

  it('deve validar campo obrigatório "instagram"', () => {
    const user = {
      name: 'Cassio',
      instagram: '',
      password: '123456'
    }
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe o seu código do Instagram!')
  })

  it('deve validar campo obrigatório "password"', () => {
    const user = {
      name: 'Cassio',
      instagram: '@cassio',
      password: ''
    }
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe a sua senha secreta!')
  })

  it('deve validar "credenciais não informadas"', () => {
    const user = {
      name: 'Cassio',
      instagram: '',
      password: ''
    }
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    loginPage.modal.haveText('Por favor, informe suas credenciais!')
  })

})
