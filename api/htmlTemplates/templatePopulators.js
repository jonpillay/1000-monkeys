const fs = require('fs');
const path = require('path');

const populateInviteEmail = (inviteName, inviteCode, invitelink) => {

    const inviteEmailTemplatePath = path.join(__dirname, 'inviteEmailTemplate.html');
    let inviteEmailTemplate = fs.readFileSync(inviteEmailTemplatePath, 'utf-8')

    inviteEmailTemplate = inviteEmailTemplate.replaceAll('{{invitename}}', inviteName)
    inviteEmailTemplate = inviteEmailTemplate.replaceAll('{{invitecode}}', inviteCode)
    inviteEmailTemplate = inviteEmailTemplate.replaceAll('{{invitelink}}', invitelink)

    return inviteEmailTemplate

}

module.exports = {populateInviteEmail}