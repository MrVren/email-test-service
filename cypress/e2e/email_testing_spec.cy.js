/// <reference types="cypress" />

describe('Checking the contact between the customer and the photographer', () => {

    const uniqueNumber = Cypress._.random(0, 1e6);

    const photographer_page = 'https://app.picsello.com/photographer/michael-droz-photo'

    // Customer's info
    const c_name = 'Alexander'
    const inboxId = Cypress.env('inboxId')
    let c_email
    const c_phone = '4444224444'
    const c_message = `This is a test shoot. Code:${uniqueNumber}`

    // Photographer's credentials
    const user_host = Cypress.env('user_host')
    const user_email = Cypress.env('user_email')
    const user_passwd = Cypress.env('user_passwd')

    const expextingText = 'Thank you for your interest in Michael Droz PHoto'

    // Variables for test results
    let fullReport = ''
    let report1 = 'Test 1: Contact Form Submission - '
    let report2 = 'Test 2: Photographer Login - '
    let report3 = 'Test 3: Photographer Received Customer Inquiry - '
    let report4 = 'Test 4: Automation Auto Reply - '

    Cypress.on('fail', (error, runnable) => {
        // Catch and record the error for the corresponding test
        if (runnable.title === 'Contact Form Submission') {
            report1 += `Failed\nError: ${error.message}\n`
        } else if (runnable.title === 'Photographer Login') {
            report2 += `Failed\nError: ${error.message}\n`
        } else if (runnable.title === 'Photographer Received Customer Inquiry') {
            report3 += `Failed\nError: ${error.message}\n`
        } else if (runnable.title === 'Automation Auto Reply') {
            report4 += `Failed\nError: ${error.message}\n`
        }
    })

    beforeEach(() => {
        //pass
    })

    it('Contact Form Submission', () => {
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
                    report1 += 'Passed\n'
                })
        })
    })

    it('Photographer Login', () => {
        cy.login(user_email, user_passwd)
            .then(() => {
                report2 += 'Passed\n'
            })
    })

    it('Photographer Received Customer Inquiry', () => {
        cy.login(user_email, user_passwd)
        cy.visit(`${user_host}/inbox`)
        cy.wait(2000)
        cy.contains('New lead from profile').click({force: true, multiple: true})
        cy.get('.whitespace-pre-line').should('contain.text', c_message)
            .then(() => {
                report3 += 'Passed\n'
            })
        cy.get('.top-0 > .ml-auto').click()
        cy.wait(2000)
        cy.get('.btn-warning').click()
        cy.wait(2000)
    })

    it('Automation Auto Reply', () => {
        cy.waitForLatestEmail(inboxId).then(email => {
            //verify we received an email
            cy.wrap(email).should('exist')
            //verify that email contains expecting text
            cy.wrap(email.body).should('include', expextingText)
            cy.log('Autoreply was received!')
            cy.log('Deleting message...')
            cy.clearInbox(email.id)
            cy.log('Message was deleted. Mailbox is empty')
            report4 += 'Passed\n'
        })
    })

    it('Sending report', () => {
        fullReport = report1 + report2 + report3 + report4
        cy.log(`Full report: ${fullReport}`)
        cy.sendReport(inboxId, fullReport)
    })
})
