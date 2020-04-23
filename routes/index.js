const express= require('express')
const router= express.Router()
const product=require('./products')
const admin= require('./admin')
const user= require('./user')
const cart= require('./cart')

router.use('/product',product)
router.use('/admin',admin)
router.use('/', user)
router.use('/cart', cart)
module.exports= router