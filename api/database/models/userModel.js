const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
  credits: {
    type: Number,
    required: true
  },
  invite_code: {
    type: String,
    required: true
  },
  isActivated: {
    type: Boolean,
    default: false
  },
  isSuper: {
    type: Boolean,
    default: false
  },
  isWarned: {
    type: Boolean,
    default: false
  },
  termsAccepted: {
    type: Boolean,
    default: false
  },
  booksRead: {
    type: Array,
    default: []
  }
})

// static methods

userSchema.statics.signup = async function (email, password, username) {

  if (!email || !password || !username) {
    throw Error("Must have email, password, and username")
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.")
  }

  const passwordScore = validator.isStrongPassword(password, { returnScore: true })

  if (passwordScore < 45) {
    throw Error("Please enter a strong password.")
  }
  if (validator.isEmail(username)) {
    throw Error("Username Cannot Be Email")
  }
  // validator for intive code?

  const emailCheck = await this.findOne({email})

  if (!emailCheck) {
    throw Error("Email not found.")
  }

  const usernameCheck = await this.findOne({username: new RegExp(`^${usernameInput}$`, 'i') })

  if (usernameCheck) {
    throw Error("Username in use")
  }

  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)

  const filter = {email: email}

  const update = { isActivated: true, password: passwordHash, username: username }

  const options = { new: true }

  const user = await this.findOneAndUpdate(filter, update, options)

  return user
}

userSchema.statics.newUser = async function (email, invite_code, credits_issued) {
  if (!email || !invite_code) {
    throw Error("Please enter email and invite-code")
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.")
  }

  const potential_user = await this.findOne({ email })

  if (potential_user) {
    throw Error("email already in use")
  }

  const salt = await bcrypt.genSalt()
  const inviteHash = await bcrypt.hash(invite_code, salt)

  await this.create({ email: email, invite_code: inviteHash, credits: credits_issued })
}

userSchema.statics.activate = async function (email, invite_code) {
  if (!email || !invite_code) {
    throw Error("Please enter email and invite-code")
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.")
  }

  const activation_user = await this.findOne({email})

  if (!activation_user) {
    throw Error("Email not found.")
  }

  if (activation_user.isActivated == true) {
    throw Error("Invite code already used, please contact admin")
  }

  const inviteCheck = await bcrypt.compare(invite_code, activation_user.invite_code)

  if (!inviteCheck) {
    throw Error("Invite code and email don't match")
  } else {
    return activation_user
  }
}

userSchema.statics.login = async function (email, password) {

  if (password == "") {
    throw Error("Enter proper credentials.")
  }

  if (!email || !password) {
    throw Error("Please enter email/username and password.")
  }

  const input = email.trim()

  let login_user

  if (validator.isEmail(input)) {
    login_user = await this.findOne({ email:input })
  } else {
    login_user = await this.findOne({ username:input })
  }

  if (!login_user) {
    throw Error("Email not found.")
  }

  if (login_user.isActivated == false) {
    throw Error("Activate account with invite code.")
  }

  const passwordCheck = await bcrypt.compare(password, login_user.password)

  if (!passwordCheck) {
    throw Error("Invalid Login Credentials.")
  } else {
    if (login_user.isWarned == true) {
      throw Error("Account Suspended. Please Contact Admin")
    } else {
      return login_user
    }
  }
}

userSchema.statics.creditAdjust = async function (_id, amount) {

  const filter = { _id: _id }

  const update = { $inc: { credits: amount } }

  const options = { new: true }

  const credit_user = await this.findOneAndUpdate(filter, update, options).select('credits')

  return credit_user
 
}

userSchema.statics.watch = async function (_id) {

  const filter = { _id: _id }
  const update = { isWarned: true }
  const options = { new: true }

  await this.findOneAndUpdate(filter, update, options)

  return

}

userSchema.statics.unWatch = async function (_id) {

  const filter = { _id: _id }
  const update = { isWarned: false }
  const options = { new: true }

  await this.findOneAndUpdate(filter, update, options)

  return

}

userSchema.statics.acceptTerms = async function (email) {

  const filter = { email: email }
  const update = { termsAccepted: true }
  const options = { new: true }

  await this.findOneAndUpdate(filter, update, options)

  return

}

userSchema.statics.addBookRead = async function (_id, bookID) {
  
  const filter = { _id: _id }
  const update = { $push: { booksRead: bookID } }
  const options = { new: true }

  const updatedUser = await this.findOneAndUpdate(filter, update, options)

  return updatedUser.booksRead

}

module.exports = mongoose.model('User', userSchema)