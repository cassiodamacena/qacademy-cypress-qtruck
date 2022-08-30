/// <reference types="cypress" />

Cypress.Commands.add('login', (user) => {
    cy.visit('/')
    if (user.instagram) cy.get('input[name="instagram"]').type(user.instagram)
    if (user.password) cy.get('input[name="password"]').type(user.password)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('modalMessageValidator', (messageExpected) => {
    cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', messageExpected)
})

Cypress.Commands.add('loggedUserValidator', (name) => {
    cy.get('p.logged-user')
        .should('be.visible')
        .should('have.text', `Olá, ${name}`)
})


/// Helpers Commands

Cypress.Commands.add('api_resetUser', (instagram)=>{
    cy.request({
        url: 'http://localhost:3333/helpers/reset-user',
        method: 'DELETE',
        qs: {
            instagram: instagram
        }
    }).then(response => {
        expect(response.status).to.eql(204)
    })
})


/// API Commands
Cypress.Commands.add('api_createUser', (user) => {

    cy.api_resetUser(user.instagram)
    
    cy.request({
        url: 'http://localhost:3333/signup',
        method: 'POST',
        body:  user 
    }).then(response => {
        expect(response.status).to.eql(201)
    })
})

Cypress.Commands.add('api_createFoodTruck', (foodTruck) => {

    cy.log(localStorage.getItem('qtruck:token'))

    cy.request({
      url: 'http://localhost:3333/foodtrucks'  ,
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('qtruck:token')
    },
      body: foodTruck,
      failOnStatusCode: false
    }).then(response => {
        expect(response.status).to.eql(201)
    })
})


// Web Commands
import loginPage from '../support/pages/Login'
import mapPage from '../support/pages/Map'

Cypress.Commands.add('uiLogin', (user)=> {
    cy.api_createUser(user)
    loginPage.go()
    loginPage.form(user)
    loginPage.submit()
    mapPage.loggedUserValidator(user.name)
})

Cypress.Commands.add('uiSetGeolocation', (lat, long)=> {
    localStorage.setItem('qtruck:latitude', lat)
    localStorage.setItem('qtruck:longitude', long)
})
