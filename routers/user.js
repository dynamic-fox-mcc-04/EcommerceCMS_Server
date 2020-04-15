const router = require('express').Router()
const UserController = require('../controllers/UserController')
const loginAuth = require('../middlewares/loginAutho')

router.post('/register', UserController.register)
router.post('/login', loginAuth, UserController.login)

module.exports = router