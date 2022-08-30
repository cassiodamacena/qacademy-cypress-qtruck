import mapPage from '../support/pages/Map'
import createPage from '../support/pages/Create'

describe('Recomendar Food Truck', () => {

    const messageExpected = {
        sucess: 'Food truck cadastrado com sucesso!',
        duplicated: 'Esse food fruck já foi cadastrado!',
        no_localization: 'Por favor, marque a localização no mapa!',
        fields_not_informed: 'Os campos nome, descrição e horário de funcionamento devem ser informados para recomendar um food truck!'
    }

    it('Deve recomentar um FoodTruck', () => {

        const user = {
            name: 'Benson',
            instagram: '@benson',
            password: '123456'
        }

        const foodTruck = {
            latitude: '-22.742870249116013',
            longitude: '-45.102390646934516',
            name: 'Nadir Lanches',
            details: 'O lanche é muito bom, já a batata vem banhada na gordura.',
            opening_hours: '14h às 22hs',
            open_on_weekends: false
        }       

        cy.uiLogin(user)

        mapPage.createLink()
        createPage.fillForm(foodTruck)
        createPage.submit()
        createPage.modal.haveText(messageExpected.sucess)    
    })

    it('Não deve cadastrar foodtruck com nome duplicado', ()=> {
        // 1 - a massa de testes deve ser independente
        // 2 - Latitude e longitude dever ser única
        // 3 - Você deve encontrar e corrigir o bug

        const user = {
            name: 'Nicolas',
            instagram: '@nicolas',
            password: '123456'
        }

        const foodTruck = {
            latitude: '-22.741603726864387',
            longitude: '-45.1023691892624',
            name: 'Padaria princesa',
            details: 'Pãozinho frances da horinha',
            opening_hours: '14h às 22hs',
            open_on_weekends: false
        }

        cy.uiLogin(user)

        cy.api_createFoodTruck(foodTruck)       
        mapPage.createLink()
        createPage.fillForm(foodTruck)
        createPage.submit()
        createPage.modal.haveText(messageExpected.duplicated)  

    })

    context('Deve validar campos obrigatórios', ()=> {

        const user = {
            name: 'Nicolas',
            instagram: '@nicolas',
            password: '123456'
        }

        const foodTruck = {
            latitude: '-22.741603726864387',
            longitude: '-45.1023691892624',
            name: 'Padaria princesa',
            details: 'Pãozinho frances da horinha',
            opening_hours: '14h às 22hs',
            open_on_weekends: false
        }

        it('Quando não informar nenhum campo', ()=> {
            cy.uiLogin(user)
            mapPage.createLink()
            createPage.submit()
            createPage.modal.haveText(messageExpected.no_localization)  
        })

        it('Quando não informar a "localização"', ()=> {
            
            foodTruck.latitude = ''
            foodTruck.longitude = null

            cy.uiLogin(user)
    
            mapPage.createLink()
            createPage.fillForm(foodTruck)
            createPage.submit()
            createPage.modal.haveText(messageExpected.no_localization)  
        })

        it('Quando não informar "Nome"', ()=> {
            foodTruck.latitude ='-22.741603726864387',
            foodTruck.longitude = '-45.1023691892624',
            foodTruck.name = ''

            cy.uiLogin(user)
    
            mapPage.createLink()
            createPage.fillForm(foodTruck)
            createPage.submit()
            createPage.modal.haveText(messageExpected.fields_not_informed)  
        })

        it('Quando não informar "Descrição"', ()=> {
            
            foodTruck.details = ''

            cy.uiLogin(user)
    
            mapPage.createLink()
            createPage.fillForm(foodTruck)
            createPage.submit()
            createPage.modal.haveText(messageExpected.fields_not_informed)  
        })

        it('Quando não informar "Horário"', ()=> {
            
            foodTruck.opening_hours = ''

            cy.uiLogin(user)
    
            mapPage.createLink()
            createPage.fillForm(foodTruck)
            createPage.submit()
            createPage.modal.haveText(messageExpected.fields_not_informed)  
        })

    })
    



})