const sanitiseInput = require('../sanitiseFuncts/sanitiseInput')
const JWT = require('jsonwebtoken')
const User = require('../database/models/userModel')

const requireCleanInput = async (req, res, next) => {

  const _id = req.user._id

  console.log(_id)

  const GPTPromptHistory = req.body.GPTPromptHistory

  let checkContent = ""

  try {
    checkContent = GPTPromptHistory[GPTPromptHistory.length-1].content
  } catch(error) {
    return res.status(400).json({
      error: 'CORRUPTPROMPTHISTORY',
      message: 'Your Prompt History Has Been Corrupted. Please Reload Story.'
    })
  }

  if (checkContent.split(" ").length > 125) {
    User.watch(_id)
    return res.status(406).json({
      error: 'LENGTHCHECKERROR',
      message: 'Malicious Request Detect. Your Authorisation has been Revoked. Please Contact Admin'
    })
  }

  const cleanCheck = sanitiseInput(checkContent)

  if (cleanCheck == false ) {
    User.watch(_id)
    return res.status(406).json({
      error: 'BADWORDPROMPTERROR',
      message: 'Malicious Request Detect. Your Authorisation has been Revoked. Please Contact Admin'
    })
  } else if (cleanCheck == true) {
    next()
  }

}

module.exports = requireCleanInput;