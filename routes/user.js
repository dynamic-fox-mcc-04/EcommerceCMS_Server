const router = require('express').Router()
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/', authentication, UserController.findUser)
router.put('/', authentication, UserController.updateBalance)
module.exports = router