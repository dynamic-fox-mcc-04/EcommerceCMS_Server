const router = require('express').Router()
const user = require('./user')
const product = require('./product')
const customer = require('./customer')

router.use('/user',user)
router.use('/product',product)
router.use('/customer',customer)
module.exports = router