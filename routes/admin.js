const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/adminController')

router.post('/signup', AdminController.signup)
router.post('/signin', AdminController.signin)

module.exports = router