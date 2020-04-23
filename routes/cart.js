const express= require('express')
const router= express.Router()
const CartController= require('../controller/cart')
const authentication= require('../middlewares/authenticationUser')
const authorization = require('../middlewares/authorizationUser')
const ProductController= require('../controller/product')


router.put('/product', ProductController.put)
router.use(authentication)
router.get('/',CartController.findAll)
router.post('/', CartController.create)
router.get('/:id', CartController.findByPk)
router.put('/:id', CartController.update)

router.delete('/:id', authorization, CartController.delete)

module.exports= router