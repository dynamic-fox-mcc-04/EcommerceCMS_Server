const router = require('express').Router()
const controller = require('../controllers/order')
const auth = require('../middleware/authCustomer')

router.use(auth)
router.post('/order', controller.create)
router.get('/order', controller.readCart)
router.get('/order/checkout', controller.checkout)

module.exports = router