const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireInviteMatch = async (req, res, next) => {

  console.log(req.body)

  const { authorization } = req.headers

  if (!authorization) {
    console.log("req headers not present")
    return res.status(401).json({ error: 'Invalid Request' })
  }

  const { email, password } = req.body

  console.log(email)

  const token = authorization.split(' ')[1]

  console.log(token)

  try {
    const {token_email, invite_code } = JWT.verify(token, process.env.JWT_SIGNATURE)

    console.log("made it here")
    console.log(email)
    console.log(token_email)

    if (email != token_email) {
      return res.status(401).json({ error: "Signup Email must match invite email" })
    }

    req.user = await User.findOne({ email }).select('email')
    
    console.log(req.user)

    next()

  } catch (error) {
    console.log(error)
    console.log("This is where we ended up!")
    res.status(401).json({ error: "Email not Found." })
  }
}

module.exports = requireInviteMatch;