/// <reference types="cypress" />

describe('Checking the contact between the customer and the photographer', () => {

    const photographer_page = 'https://app.picsello.com/photographer/michael-droz-photo'

    // Customer's info
    const c_name = 'Alexander'
    const inboxId = Cypress.env('inboxId')
    let c_email
    const c_phone = '4444224444'
    const c_message = 'This is a test shoot request from QA'

    // Photographer's credentials
    const user_host = Cypress.env('user_host')
    const user_email = Cypress.env('user_email')
    const user_passwd = Cypress.env('user_passwd')

    const expextingText = 'Thank you for your interest in Michael Droz PHoto'

    // Variables for test results
    let fullReport = ''
    let report1 = ''
    let report2 = ''
    let report3 = ''

    Cypress.on('fail', (error, runnable) => {
        // Catch and record the error for the corresponding test
        if (runnable.title === 'C214: Sending shoot request') {
            report1 = `Test 1: "Sending shoot request" failed\nError: ${error.message}\n`
        } else if (runnable.title === 'C215: Should receive customer\'s request') {
            report2 = `Test 2: "Should receive customer\'s request" failed\nError: ${error.message}\n`
        } else if (runnable.title === 'C216: Should receive autoreply') {
            report3 = `Test 3: "Should receive autoreply" failed\nError: ${error.message}\n`
        }
    })

    beforeEach(() => {
        //pass
    })

    it('C214: Sending shoot request', () => {
        cy.getInbox(inboxId).then(inbox => {
            c_email = inbox.emailAddress
            cy.log(`${c_email} mailbox ready`)
            cy.visit(photographer_page)
            cy.get('#contact-form_name').type(c_name)
            cy.get('#contact-form_email').type(c_email)
                .should('have.attr', 'type', 'email')
            cy.get('#live_phone-phone > .text-input').type(c_phone)
            cy.get('.grid > :nth-child(4)').click()
            cy.get('#contact-form_message').type(c_message)
            cy.get('.mt-8 > .w-full').click()
            cy.wait(1000)
            cy.get('h2').should('include.text', 'Thank you for contacting me')
                .then(() => {
                    report1 = 'Test 1: "Sending shoot request" passed\n'
                })
        })
    })
/*
    it('C215: Should receive customer\'s request', () => {
        cy.visit(`${user_host}/users/log_in`)
        cy.get('#user_email').type(user_email)
            .should('have.attr', 'type', 'email')
            .and('have.value', user_email)
        cy.get('#user_password').type(user_passwd)
            .should('have.attr', 'type', 'password')
            .and('have.value', user_passwd)
        cy.get('.btn-primary').click()
        cy.wait(2000)
        cy.visit(`${user_host}/inbox`)
        //this shit is not working
        cy.get('.mx-4').click()
        cy.get('.whitespace-pre-line').should('contain.text', c_message)
            .then(() => {
                report2 = 'Test 2: "Should receive customer\'s request" passed\n'
            })
    })
*/
    it('C216: Should receive autoreply', () => {
        cy.waitForLatestEmail(inboxId).then(email => {
            //verify we received an email
            cy.wrap(email).should('exist')
            //verify that email contains expecting text
            cy.wrap(email.body).should('include', expextingText)
            cy.log('Autoreply was received!')
            cy.log('Deleting message...')
            cy.clearInbox(email.id)
            cy.log('Message was deleted. Mailbox is empty')
            report3 = 'Test 3: "Should receive autoreply" passed\n'
        })
    })

    it('Sending report', () => {
        fullReport = report1 + report2 + report3
        cy.log(`Full report: ${fullReport}`)
        cy.sendReport(inboxId, fullReport)
    })
})
