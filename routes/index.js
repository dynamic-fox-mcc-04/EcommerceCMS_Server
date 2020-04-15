const router = require("express").Router()
const userRouter = require("./users")
const productRouter = require("./products")

router.use(userRouter)
router.use('/products', productRouter)


module.exports = router