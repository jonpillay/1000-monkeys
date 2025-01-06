const sanitiseInput = require('../sanitiseFuncts/sanitiseInput')
const User = require('../database/models/userModel')

const requireCleanInput = async (req, res, next) => {

  const user = req.user
  const GPTPromptHistory = req.GPTPromptHistory

  let checkContent = ""

  try {
    checkContent = GPTPromptHistory[-1]['content']
  } catch(error) {
    return res.status(401).json({
      error: 'CORRUPTPROMPTHISTORY',
      message: 'Your Prompt History Has Been Corrupted. Please Reload Story.'
    })
  }

  if (checkContent.split(" ").length > 125) {
    User.watch(user._id)
    return res.status(401).json({
      error: 'LENGTHCHECKERROR',
      message: 'Malicious Request Detect. Your Authorisation has been Revoked. Please Contact Admin'
    })
  }

  const cleanCheck = sanitiseInput(checkContent)

  if (cleanCheck == false ) {
    User.watch(user._id)
    return res.status(401).json({
      error: 'BADWORDPROMPTERROR',
      message: 'Malicious Request Detect. Your Authorisation has been Revoked. Please Contact Admin'
    })
  } else if (cleanCheck == true) {
    next()
  }

}

module.exports = requireCleanInput;