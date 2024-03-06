const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireAuth = async (req, res, next) => {

  // console.log(req.headers)

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Login Required' })
  }

  const token = authorization.split(' ')[1]

  try {
    const {_id} = JWT.verify(token, process.env.JWT_SIGNATURE)

    req.user = await User.findOne({ _id }).select('_id credits')
    console.log("made it through auth request")
    next()

  } catch (error) {
    console.log(error)
    console.log("This is where we ended up!")
    res.status(401).json({ error: "Cannot authorise request." })
  }
}

module.exports = requireAuth;