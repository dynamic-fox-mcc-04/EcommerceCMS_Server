const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/signup', UserController.Signup)
router.post('/signin', UserController.Signin)

module.exports = router