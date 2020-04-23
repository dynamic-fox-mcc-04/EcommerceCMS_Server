const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const adminauthentication = require('../middlewares/adminauthentication')
router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.post('/', adminauthentication, ProductController.addProduct)
router.put('/edit/:id', adminauthentication, ProductController.editProduct)
router.delete('/delete/:id', adminauthentication, ProductController.deleteProduct)

module.exports = router