const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireAdminAuth = async (req, res, next) => {

  // console.log(req.headers)

  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Must be admin no header' })
  }

  const token = authorization.split(' ')[1]

  console.log(token)

  try {
    const {_id, isSuper} = JWT.verify(token, process.env.JWT_SIGNATURE)

    console.log("made it here")
    console.log(typeof isSuper)

    req.user = await User.findOne({ _id }).select('_id')
    
    console.log(req.user)

    if (isSuper != true) {
      res.status(401).json({ error: "Must be admin super check." })
    }

    next()

  } catch (error) {
    console.log(error)
    console.log("This is where we ended up!")
    res.status(401).json({ error: "Must be admin." })
  }
}

module.exports = requireAdminAuth;