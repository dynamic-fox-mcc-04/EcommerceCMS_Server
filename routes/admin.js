const router = require('express').Router()
const AdminController = require('../controllers/AdminController')
const ProductController = require('../controllers/ProductController')
const adminauthentication = require('../middlewares/adminauthentication')
router.post('/login', AdminController.login)
router.use(adminauthentication)
router.post('/addproduct', ProductController.addProduct)
router.put('/edit/:id', ProductController.editProduct)
router.delete('/delete/:id', ProductController.deleteProduct)

module.exports = router