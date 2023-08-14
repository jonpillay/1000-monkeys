const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken')

const genJWT = (_id, isAdmin) => {
  return jwt.sign({_id, isAdmin}, process.env.JWT_SIGNATURE, {expiresIn: '1d'})
}

const UserController = {
  LoginUser: async (req, res) => {

    const {email, password} = req.body

    try {

      const user = await User.login(email, password)

      const JWT = genJWT(user._id)

      res.status(200).json({ email: email, token: JWT })
    } catch (error) {

      res.status(400).json({error: error.message })
    }



    // res.json({ mssg: 'user logged in (kinda)' })
  },
  SignUpUser: async (req, res) => {
    const {email, password} = req.body

    try {
      const user = await User.signup(email, password)

      const JWT = genJWT(user._id, user.isAdmin)

      res.status(200).json({ email: email, token: JWT })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  CreateUser: async (req, res) => {
    const {email, invite_code} = req.body

    try {
      const user = await User.signup(email, password)

      const JWT = genJWT(user._id, user.isAdmin)

      res.status(200).json({ email: email, token: JWT })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}


module.exports = UserController