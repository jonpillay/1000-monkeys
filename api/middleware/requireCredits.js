const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireCredits = async (req, res, next) => {

  const user = req.user

  const credits_needed = req.body.credits_needed

  if ( user.credits < credits_needed ) {
    return res.status(401).json({ error: "Not enough nuts" });
  }

  next()
}

module.exports = requireCredits;