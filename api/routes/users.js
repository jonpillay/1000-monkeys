const express = require('express')

const UserController = require('../controllers/userController')

const requireAdminAuth = require('../middleware/requireAdminAuth')
const requireInviteMatch = require('../middleware/requireInviteMatch')

const router = express.Router()

router.post('/login', UserController.LoginUser)

router.post('/activate', UserController.Activation)

router.post('/signup', requireInviteMatch, UserController.SignUpUser)

router.post('/newuser', requireAdminAuth, UserController.CreateUser)

module.exports = router