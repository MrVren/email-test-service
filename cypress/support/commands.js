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
        subject: 'Picsello testing report',
        body: reportResult
    })
})