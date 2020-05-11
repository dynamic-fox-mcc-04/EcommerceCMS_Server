const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const customer = require('./customer')
const order = require('./order')

router.use('/customer',customer)
router.use('/customer',order)
router.use('/', user)
router.use('/', product)


module.exports = router