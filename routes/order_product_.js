const router = require('express').Router()
const Order_Product_Controller = require('../controllers/order_product_Controller.js')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', Order_Product_Controller.findAll)
router.get('/:OrderId', Order_Product_Controller.findAllOrderId)
// router.get('/:id', Order_product_Controller.findOne)
router.post('/:id', Order_Product_Controller.create)
// router.delete('/:id', Order_product_Controller.delete)
router.put('/:id', Order_Product_Controller.put)

module.exports = router