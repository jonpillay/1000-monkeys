const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken')

const genActivationJWT = (token_email, invite_code) => {
  return jwt.sign({token_email, invite_code}, process.env.JWT_SIGNATURE, {expiresIn: '10m'})
}

const genLoginJWT = (_id, isSuper) => {
  return jwt.sign({_id, isSuper}, process.env.JWT_SIGNATURE, {expiresIn: '1d'})
}

const UserController = {
  LoginUser: async (req, res) => {

    const {email, password} = req.body

    try {

      const user = await User.login(email, password)

      const JWT = genLoginJWT(user._id, user.isSuper)

      res.status(200).json({ id: user._id, username: user.username, email: email, token: JWT, isSuper: user.isSuper, credits: user.credits })
    } catch (error) {

      res.status(400).json({error: error.message })
    }

    // res.json({ mssg: 'user logged in (kinda)' })
  },
  SignUpUser: async (req, res) => {
    const {email, password} = req.body
    const authEmail = req.user

    try {
      const user = await User.signup(email, password)

      const JWT = genLoginJWT(user._id, user.isSuper)

      res.status(200).json({ email: email, token: JWT })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  CreateUser: async (req, res) => {

    const {email, invite_code} = req.body

    try {
      const user = await User.newUser(email, invite_code)

      res.status(200).json({message: "user created"})
    } catch (error) {
      console.log(error)
      res.status(400).json({error: error.message})
    }
  },
  Activation: async (req, res) => {
    const {email, invite_code} = req.body

    try {
      const user = await User.activate(email, invite_code)

      // JWT should be a seperate one for activation only
      const JWT = genActivationJWT(user.email, user.invite_code)

      res.status(200).json({ email: email, token: JWT, error:"made it" })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}


module.exports = UserController