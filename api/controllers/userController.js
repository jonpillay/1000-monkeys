const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken')

const genActivationJWT = (invite_code) => {
  return jwt.sign({invite_code}, process.env.JWT_SIGNATURE, {expiresIn: '10m'})
}


// IS THIS MALFORMING THE JWT?
const genLoginJWT = (_id, isSuper) => {
  return jwt.sign({_id, isSuper}, process.env.JWT_SIGNATURE, {expiresIn: '1d'})
}

const UserController = {
  LoginUser: async (req, res) => {

    const {email, password} = req.body

    try {

      const user = await User.login(email, password)

      const JWT = genLoginJWT(user._id, "true")

      res.status(200).json({ email: email, token: JWT, isSuper: user.isSuper })
    } catch (error) {

      res.status(400).json({error: error.message })
    }



    // res.json({ mssg: 'user logged in (kinda)' })
  },
  SignUpUser: async (req, res) => {
    const {email, password} = req.body
    const authEmail = req.user

    if (authEmail != email) {
      res.status(400).json({error: "invalid request"})
    } 

    try {
      const user = await User.signup(email, password)

      const JWT = genLoginJWT(user._id, user.isSuper)

      res.status(200).json({ email: email, token: JWT })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  CreateUser: async (req, res) => {
    console.log("This is the req obj!")
    console.log(req.body)
    const {email, invite_code} = req.body

    try {
      const user = await User.newUser(email, invite_code)

      res.status(200).json({error: "user created"})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },
  Activation: async (req, res) => {
    const {email, invite_code} = req.body

    try {
      const user = await User.activate(email, invite_code)

      // JWT should be a seperate one for activation only
      const JWT = genActivationJWT(user.invite_code)

      res.status(200).json({ email: email, token: JWT })
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }
}


module.exports = UserController