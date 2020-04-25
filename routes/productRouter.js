const router = require('express').Router()
const ProductController = require('../controllers/ProductController.js')
const { authentication } = require('../middlewares/auth.js')
const { admin_authorization } = require('../middlewares/auth.js')

router.get('/', ProductController.read)
router.get('/:id', ProductController.detail)
router.post('/', authentication, ProductController.create)
router.put('/:id', authentication, admin_authorization, ProductController.edit)
router.delete('/:id', authentication, admin_authorization, ProductController.delete)

module.exports = router