
import modal from '../../components/Modal'

class CreatePage {

    constructor() {
        this.modal = modal
    }

    fillForm(foodTruck) {
        cy.uiSetGeolocation(foodTruck.latitude, foodTruck.longitude)
        if (foodTruck.name) cy.get('input[name="name"]').type(foodTruck.name)
        if (foodTruck.details) cy.get('textarea[name="details"]').type(foodTruck.details)
        if (foodTruck.opening_hours) cy.get('input[name="opening-hours"]').type(foodTruck.opening_hours)

        cy.contains('button', foodTruck.open_on_weekends ? 'Sim' : 'Não')


        // if (foodTruck.open_on_weekends === 'Sim')
        //     cy.contains('button', 'Sim').click()

        // if (foodTruck.open_on_weekends === 'Não')
        //     cy.contains('button', 'Não').click()
    }
    submit() {
        cy.get('button[type="submit"]').click()
    }

}

export default new CreatePage()