const router = require('express').Router()
const CartController = require('../controllers/CartController.js')
const { customer_authorization } = require('../middlewares/auth.js')
const { authentication } = require('../middlewares/auth.js')

router.use(authentication)
router.get('/', CartController.read)
router.post('/', CartController.addCart)
router.get('/checkout', CartController.checkoutCart)
router.use(customer_authorization)
router.patch('/:id', CartController.editQuantity)
router.delete('/:id', CartController.deleteCart)


module.exports = router