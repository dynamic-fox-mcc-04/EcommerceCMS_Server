const router = require('express').Router()
const products = require('./productRouter.js')
const users = require('./userRouter.js')
const carts = require('./cartRouter.js')

router.use('/users', users)
router.use('/products', products)
router.use('/carts', carts)

module.exports = router