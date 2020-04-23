const router = require('express').Router()
const Order_Product_Controller = require('../controllers/order_product_Controller.js')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', Order_Product_Controller.findAll)
router.post('/:id', Order_Product_Controller.create)
router.put('/:id', Order_Product_Controller.put)

module.exports = router