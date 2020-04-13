const express= require('express')
const router= express.Router()
const product=require('./products')
const admin= require('./admin')

router.use('/product',product)
router.use('/admin',admin)
module.exports= router