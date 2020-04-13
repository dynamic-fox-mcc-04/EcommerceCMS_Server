const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authientication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', ProductController.addProduct)
router.get('/', ProductController.readProduct)
router.delete('/:id', authorization, ProductController.deleteProduct)
router.patch('/:id', authorization, ProductController.updateProduct)

module.exports = router