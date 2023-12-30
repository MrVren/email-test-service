/// <reference types="cypress" />

describe('picsello random autotests', () => {
    /*
    You can locate and modify default values in the 'cypress.env.json' file. 
    To launch Cypress with different values, include them in the command line like this:
    "npx cypress run --env host=example.com, email=mail@example.com, passwd=yourpassword123"
    */ 
    const host = Cypress.env('host')
    const email = Cypress.env('email')
    const passwd = Cypress.env('passwd')

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.login(email, passwd)
    })
    /*
    You should include your test case ID(s) in the string.
    You can name your test as you wish, but case ID(s) are required.
    If you are using more than 1 test case ID, you can list them with a comma
    like this it('C1, C2, C3, C9, C5: your test name)', ...
    */
    it('C132: Walk around gallery (testing autosend from cloud)', () => {
        cy.visit(`https://${host}/home`)
        cy.get('.flex-grow > [href="/galleries"]').click()
        cy.get('.flex-wrap > .justify-center').click()
        cy.log('inside pop-up form')
        cy.get('.btn-secondary').click()
        cy.get('.grid > :nth-child(3)').click()
        cy.get('.btn-secondary').click()
    })

    it('C139: Walk around leads page', () => {
        cy.visit(`https://${host}/home`)
        cy.get('#get-booked-nav > .group').click()
        cy.wait(1000)
        cy.get('#get-booked-nav > .absolute > .flex-col > [href="/leads"]').click()
        cy.get('#search_phrase_input').type('ab-dab-dab')
            .should('have.value', 'ab-dab-dab')
        cy.get('#status').click()
        cy.wait(1000)
        //it will fail test for check sending screenshots on testrail
        cy.get('#btn-new').click() 

    })

})