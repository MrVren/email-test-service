/// <reference types="cypress" />

describe('picsello random autotests', () => {

    const user_host = Cypress.env('user_host')
    const email = Cypress.env('email')
    const passwd = Cypress.env('passwd')

    beforeEach(() => {
        cy.viewport(1920, 1080)
    })

    it('C???: should receive customer\'s request', () => {
        cy.visit(`https://${Cypress.env('user_host')}/users/log_in`)
        cy.get('#user_email').type(email)
            .should('have.attr', 'type', 'email')
            .and('have.value', email)
        cy.get('#user_password').type(passwd)
            .should('have.attr', 'type', 'password')
            .and('have.value', passwd)
        cy.get('.btn-primary').click()
        cy.wait(2000)
    })
})