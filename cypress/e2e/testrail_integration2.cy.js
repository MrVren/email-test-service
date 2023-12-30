/// <reference types="cypress" />

describe('picsello random autotests2', () => {
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

    it('C134: another simple test (testing autosend from cloud)', () => {
        cy.visit(`https://${host}/home`)
    })
})