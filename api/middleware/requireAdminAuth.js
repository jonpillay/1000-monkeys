const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireAdminAuth = async (req, res, next) => {

  if (req.method === 'OPTIONS') {
    return next();
  }

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Must be admin no header' })
  }

  const token = authorization.split(' ')[1]

  try {
    const {_id, isSuper} = JWT.verify(token, process.env.JWT_SECRETKEY)

    req.user = await User.findOne({ _id }).select('_id credits')
    
    if (isSuper != true) {
      throw Error("Must be admin super check.")
    }

    next()

  } catch (error) {
    console.log(error)
    console.log("Error From GPT Client!")
    res.status(401).json({ error: "Must be admin." })
  }
}

module.exports = requireAdminAuth;