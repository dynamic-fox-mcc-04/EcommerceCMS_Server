const router = require("express").Router()
const userRouter = require("./users")
const productRouter = require("./products")

router.use(userRouter)
router.use(productRouter)


module.exports = router