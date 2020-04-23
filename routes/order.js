const router = require('express').Router()
const controller = require('../controllers/order')
const auth = require('../middleware/authCustomer')
const authorization = require('../middleware/authorizCustomer')

router.use(auth)
router.post('/order', controller.create)
router.get('/order', controller.readCart)
router.patch('/order/checkout/:orderId', authorization,controller.checkout)
router.delete('/order/cart/:orderId/:cartId', authorization,controller.delete)

module.exports = router