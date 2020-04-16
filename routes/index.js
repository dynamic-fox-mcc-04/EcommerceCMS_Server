const router = require('express').Router()
const UserController = require('../controllers/user')
const ProductController = require('../controllers/product')
const { authenticationSuper, authenticationAdmin } = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/product', ProductController.read)

//Need superadmin authentication
router.post('/product', authenticationSuper, ProductController.create)

//Need admin authentication
router.use('/product/', authenticationAdmin)
router.put('/product/:id', authorization, ProductController.update)
router.delete('/product/:id', authorization, ProductController.destroy)

module.exports = router