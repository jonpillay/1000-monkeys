const express = require('express')

const UserController = require('../controllers/userController')

const requireAdminAuth = require('../middleware/requireAdminAuth')
const requireInviteMatch = require('../middleware/requireInviteMatch')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.post('/login', UserController.LoginUser)

router.post('/activate', UserController.Activation)

router.post('/signup', requireInviteMatch, UserController.SignUpUser)

router.post('/newuser', requireAdminAuth, UserController.CreateUser)

router.post('/watch-user', requireAuth, UserController.Watch)

module.exports = router