const User = require('../database/models/userModel')
const jwt = require('jsonwebtoken')

const creditController = {
  AdjustCredits: async (_id, amount, token) => {

    try {

      const {token_id, token_amount} = jwt.verify(token, process.env.JWT_SECRETKEY)


      if (token_id != _id || token_amount != amount) {
        throw Error("Nice Try")
      }

      const user = await User.findById(_id)

      if (amount < 0 && user.credits < amount ) {
        throw Error("Nice Try")
      }

      const credit_update = await User.creditAdjust(_id, amount)

      return credit_update

    } catch (error) {
      return error
    }
  }
}

module.exports = creditController;