const { MailSlurp } = require('mailslurp-client');
const apiKey = Cypress.env('mail_api')
const mailslurp = new MailSlurp({ apiKey })

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
    const timeout = 30_000
    return mailslurp.waitForLatestEmail(inboxId, timeout)
    
})

Cypress.Commands.add("clearInbox", (emailId) => {
    mailslurp.deleteEmail(emailId)
})

Cypress.Commands.add("getInbox", (inboxId) => {
    return mailslurp.getInbox(inboxId)
})

Cypress.Commands.add("sendReport", (inboxId, reportResult) => {
    mailslurp.sendEmail(inboxId, {
        to: [Cypress.env('email_for_reports')],
        subject: 'Picsello End-to-End Automations Test',
        body: reportResult
    })
})

// We log into the account once before the first test, after that we store the cache between 
// tests, specs even if some test fails during the process, the session will be preserved 
// and can be used for subsequent tests.
Cypress.Commands.add('login', (email, passwd) => {
    cy.session([email,passwd], () => {
        cy.visit(`${Cypress.env('user_host')}/users/log_in`)
        cy.get('#user_email').type(email)
            .should('have.attr', 'type', 'email')
            .and('have.value', email)
        cy.get('#user_password').type(passwd)
            .should('have.attr', 'type', 'password')
            .and('have.value', passwd)
        cy.get('.btn-primary').click()
        cy.wait(2000)
    },
    {
        cacheAcrossSpecs: true
    })
})