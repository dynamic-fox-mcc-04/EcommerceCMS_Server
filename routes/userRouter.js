const router = require('express').Router()
const UserController = require('../controllers/UserController.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
    // router.use('/googleLogin', UserController.googleLogin)

module.exports = router