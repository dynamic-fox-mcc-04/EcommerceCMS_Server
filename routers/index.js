var express = require('express')
var router = express.Router()
const userRouter = require("./userRouter.js")
const productRouter = require("./productRouter.js")

router.use('/', userRouter)
router.use('/products', productRouter)

module.exports = router