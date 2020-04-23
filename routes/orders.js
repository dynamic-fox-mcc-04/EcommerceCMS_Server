const router = require("express").Router()
const OrderController = require("../controllers/OrderController")
const ProductorderController = require("../controllers/ProductorderController")
const authOrder = require("../middlewares/authOrder")

router.use(authOrder)
router.post('/', OrderController.newOrder)
router.get('/', OrderController.getOrder)
router.put('/', OrderController.fixOrder)
router.post('/cart', ProductorderController.addCart)
router.get('/cart', ProductorderController.getCarts)

module.exports = router