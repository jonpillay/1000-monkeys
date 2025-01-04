const sanitiseInput = require('../sanitiseFuncts/sanitiseInput')

const requireCleanInput = async (req, res, next) => {

  const user = req.user
  const GPTPromptHistory = req.GPTPromptHistory

  try {
    GPTPromptHistory[-1]['content']
  } catch(error) {

  }

  

  next()
}

module.exports = requireCredits;