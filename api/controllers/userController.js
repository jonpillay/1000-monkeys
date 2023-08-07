const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken')

const genJWT = (_id) => {
  return jwt.sign({_id}, process.env.JWT_SIGNATURE, {expiresIn: '1d'})
}

const UserController = {
  LoginUser: async (req, res) => {

    const {email, password} = req.body

    try {

      const user = await User.login(email, password)

      const JWT = genJWT(user._id)

      res.status(200).json({ email, token: JWT })
    } catch (error) {

      res.status(400).json({error: error.message })
    }



    // res.json({ mssg: 'user logged in (kinda)' })
  },
  SignUpUser: async (req, res) => {
    const {email, password} = req.body

    try {
      const user = await User.signup(email, password)

      const JWT = genJWT(user._id)

      res.status(200).json({ email, token: JWT })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}


module.exports = UserController