const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken')

const creditController = {
  AdjustCredits: async (_id, amount, token) => {

    try {

      const {token_id, token_amount} = jwt.verify(token, process.env.JWT_SIGNATURE)

      console.log("Token comparrison")
      console.log(token_amount)
      console.log(token)

      if (token_id != _id || token_amount != amount) {
        console.log("bad response coming from the token checks")
        throw Error("Nice Try")
      }

      const user = await User.findById(_id)

      if (amount < 0 && user.credits < amount ) {
        throw Error("Nice Try")
      }


      // not a function is it
      const credit_user = await User.credits(_id, amount)

      return true

      // const user = await User.login(email, password)

      // const JWT = genLoginJWT(user._id, user.isSuper)

      // res.status(200).json({ email: email, token: JWT, isSuper: user.isSuper, credits: user.credits })
    } catch (error) {
      console.log("coming from catch on credits")
      console.log(error)
      return error
    }
  }
}

module.exports = creditController;