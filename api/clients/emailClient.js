const nodemailer = require('nodemailer')
const {populateInviteEmail} = require('../htmlTemplates/templatePopulators')

async function createMailTransporter() {
  const transporter = nodemailer.createTransport({
    service: 'gmail.com',
    auth: {
      user: process.env.APP_EMAIL_ACCOUNT,
      pass: process.env.EMAIL_PASSCODE
    }
  })

  return transporter
}

async function sendInviteEmail(invitedUserEmail, invitecode, invitelink) {

  try {

    const transporter = await createMailTransporter()

    const inviteBody = populateInviteEmail(invitedUserEmail, invitecode, invitelink)

    const mailOptions = {
      from: process.env.APP_EMAIL_ACCOUNT,
      to: invitedUserEmail,
      subject: "You Have Been Invited To A Special Adventure (Yours)",
      html: inviteBody,
    }

    const result = await transporter.sendMail(mailOptions)
    
    console.log("Email Sent", result)

  } catch (error) {
    console.log(error)
  }

}

module.exports = {sendInviteEmail}