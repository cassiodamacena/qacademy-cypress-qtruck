/// <reference types="cypress" />

import signupPage from '../support/pages/Signup'

describe('Singup', () => {

    it('Deve cadastrar um novo usuário', () => {

        const user = {
            name: 'Becka Milano',
            instagram: '@becka',
            password: '123456'
        }

        // cy.deleteMany({instagram: user.instagram}, {collection: 'users'}).then(res => { 
        //     cy.log(res);
        // });

        cy.api_resetUser(user.instagram)

        signupPage.go()
        signupPage.form(user)
        signupPage.submit()

        signupPage.modal.haveText('Agora você pode recomendar e/ou avaliar Food trucks.')

    })

    it('Não deve cadastrar com "instagram" duplicado', () => {
        const user = {
            name: "Érick Jacquin",
            instagram: "@jacquin",
            password: "123456"
        }

        cy.api_createUser(user)

        signupPage.go()
        signupPage.form(user)
        signupPage.submit()

        signupPage.modal.haveText('Instagram já cadastrado!')

    })

})