var express = require('express')
var router = express.Router()
const userRouter = require("./userRouter.js")
const productRouter = require("./productRoutes.js")
const shoppingCart = require("./shoppingCartRoutes.js")

router.use('/', userRouter)
router.use('/products', productRouter)
router.use('/shoppingCart', shoppingCart)

module.exports = router