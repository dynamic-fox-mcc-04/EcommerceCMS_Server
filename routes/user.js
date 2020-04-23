const router = require('express').Router()
const UserController = require('../controllers/UserController')
const UserProductController = require('../controllers/UserProductController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/cart', authentication, UserProductController.findAll)
router.post('/cart', authentication, UserProductController.add)
router.get('/cart/:id', authentication, UserProductController.findOne)
router.delete('/cart/:id', authentication, UserProductController.delete)

module.exports = router