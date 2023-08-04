const User = require('../database/models/userModel')

const UserController = {
  LoginUser: async (req, res) => {
    res.json({ mssg: 'user logged in (kinda)' })
  },
  SignUpUser: async (req, res) => {
    res.json({ mssg: 'user signed up (kinda)' })
  }
}


module.exports = UserController