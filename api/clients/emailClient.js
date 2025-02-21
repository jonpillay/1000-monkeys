const nodemailer = require('nodemailer')

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

async function sendInviteEmail(invitedUserEmail) {

  try {

    const transporter = await createMailTransporter()

    const mailOptions = {
      from: process.env.APP_EMAIL_ACCOUNT,
      to: invitedUserEmail,
      subject: "You Have Been Invited To A Special Adventure (Yours)",
      text: `Welcome ${invitedUserEmail} to 1000M. You have been invited to an adventure.`
    }

    const result = await transporter.sendMail(mailOptions)
    
    console.log("Email Sent", result)

  } catch (error) {
    console.log(error)
  }



}

module.exports = {sendInviteEmail}