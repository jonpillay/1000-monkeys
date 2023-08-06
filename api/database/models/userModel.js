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
    required: true
  },
  credits: {
    type: Number,
    required: true
  }
})

// static methods

userSchema.statics.signup = async function (email, password) {

  if (!email || !password) {
    throw Error("Must have email and password")
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.")
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Please enter a strong password.")
  }

  const emailCheck = await this.findOne({ email })

  if (emailCheck) {
    throw Error("Email in use!")
  }

  const salt = await bcrypt.genSalt()
  const passwordHash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: passwordHash, credits: 50 })

  return user
}

userSchema.statics.login = async function (email, password) {

  if (!email || !password) {
    throw Error("Please enter email and password")
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid email.")
  }

  const login_user = await this.findOne({ email })

  if (!login_user) {
    throw Error("Email not found")
  }

  const passwordCheck = await bcrypt.compare(password, login_user.password)

  if (!passwordCheck) {
    throw Error("Invalid Login Credentials.")
  } else {
    return login_user
  }
}

module.exports = mongoose.model('User', userSchema)