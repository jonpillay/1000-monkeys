const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireActivationAuth = async (req, res, next) => {

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Invite Required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const email = JWT.verify(token, process.env.JWT_SIGNATURE)

    req.user = await User.findOne(email).select('email')
    next()

  } catch (error) {
    res.status(401).json({ error: "Cannot authorise request." })
  }
}

module.exports = requireActivationAuth;