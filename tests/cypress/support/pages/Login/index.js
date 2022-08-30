/// <reference types="cypress" />

import modal from '../../components/Modal'

class LoginPage {

    constructor(){
        this.modal = modal
    }

    go() {
        cy.visit('/')
    }


    form(user) {
        if (user.instagram) cy.get('input[name="instagram"]').type(user.instagram)
        if (user.password) cy.get('input[name="password"]').type(user.password)
    }


    submit() {
        cy.get('button[type="submit"]').click()
    }


}

export default new LoginPage()