const express = require('express')
const router = express.Router()
const AdminController = require('../controller/admin')

router.post('/signup', AdminController.signup)

router.post('/signin', AdminController.signin)



module.exports= router