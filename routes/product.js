const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const authentication = require('../middlewares/authentication')

router.get('/list', ProductController.findAll)
router.get('/list/:id', authentication, ProductController.findOne)
module.exports = router