const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireCredits = async (req, res, next) => {

  const user = req.user

  if ( user.credits < 51 ) {
    return res.status(401).json({ error: "Not enough nuts" });
  }

  next()
}

module.exports = requireCredits;