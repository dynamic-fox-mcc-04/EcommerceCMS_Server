const router = require("express").Router()
const OrderController = require("../controllers/OrderController")
const authOrder = require("../middlewares/authOrder")

router.use(authOrder)
router.post('/', OrderController.newOrder)

module.exports = router