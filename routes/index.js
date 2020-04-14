const express = require('express')
const router = express.Router()
const authentication = require('../middlewere/authentication')
const AdminRouter = require('./admin')
const ProductRouter = require('./product')

router.use('/admin', AdminRouter)
router.use(authentication)
router.use('/product', ProductRouter)

module.exports = router