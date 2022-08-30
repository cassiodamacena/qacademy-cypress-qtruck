/// <reference types="cypress" />

class MapPage {


    loggedUserValidator(name) {
        cy.get('p.logged-user')
            .should('be.visible')
            .should('have.text', `Olá, ${name}`)
    }

    createLink() {
        cy.get('a[href="/foodtrucks/create"')
            .should('be.visible')
            .click()
    }


}

export default new MapPage()