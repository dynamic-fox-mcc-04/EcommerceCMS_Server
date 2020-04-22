const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')
const orderRoutes = require('./order')
const order_product_Routes = require('./order_product_')

router.get((req, res) => console.log('Successfully connected to server'))
router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)
router.use('/order_product_s', order_product_Routes)

module.exports = router