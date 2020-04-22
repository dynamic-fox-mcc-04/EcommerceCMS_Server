const express = require('express')
const router = express.Router()
const authentication = require('../middlewere/authentication')
const AdminRouter = require('./admin')
const UserRouter = require('./user')
const ProductRouter = require('./product')
const CartRouter = require('./cart')

router.use('/admin', AdminRouter)
router.use('/user', UserRouter)
router.use(authentication)
router.use('/product', ProductRouter)
router.use('/cart', CartRouter)

module.exports = router