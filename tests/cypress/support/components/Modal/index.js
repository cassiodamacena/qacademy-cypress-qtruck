/// <reference types="cypress" />

class Modal {


    haveText(messageExpected) {
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', messageExpected)
    }

}

export default new Modal()