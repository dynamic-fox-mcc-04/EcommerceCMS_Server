const router = require('express').Router()
const UserController = require('../controllers/user')
const ProductController = require('../controllers/product')
const CartController = require('../controllers/cart')
const { authenticationSuper, authenticationAdmin, authenticationUser } = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.get('/product', ProductController.read)

//Need superadmin authentication
router.post('/product', authenticationSuper, ProductController.create)

//Need admin authentication
router.use('/product', authenticationAdmin)
router.put('/product/:id', ProductController.update)
router.delete('/product/:id', ProductController.destroy)

//Need user authentication
router.use('/cart', authenticationUser)
router.post('/cart', CartController.add)
router.get('/cart', CartController.read)
router.patch('/cart', CartController.checkout)
router.patch('/cart/:id', authorization, CartController.changeAmt)
router.delete('/cart/:id', authorization, CartController.destroy)

module.exports = router