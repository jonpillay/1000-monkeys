const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireInviteMatch = async (req, res, next) => {

  if (req.method === 'OPTIONS') {
    return next();
  }

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Invalid Request' })
  }

  const { email, password } = req.body

  const token = authorization.split(' ')[1]

  try {
    const {token_email, invite_code } = JWT.verify(token, process.env.JWT_SECRETKEY)

    if (email != token_email) {
      return res.status(401).json({ error: "Signup Email must match invite email" })
    }

    req.user = await User.findOne({ email }).select('email')
    next()

  } catch (error) {
    console.log(error.error)
    console.log("Error coming from invite match!")
    res.status(401).json({ error: "Email not Found." })
  }
}

module.exports = requireInviteMatch;