const express= require('express')
const router= express.Router()
const UserController= require('../controller/user')

router.use('/signin', UserController.signin)
router.use('/signup', UserController.signup)
module.exports= router