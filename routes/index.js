const express= require('express')
const router= express.Router()
const product=require('./products')

router.use('/product',product)
module.exports= router