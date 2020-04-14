const express= require('express')
const router= express.Router()
const ProductController= require('../controller/product')
const authentication= require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', ProductController.findAll)
router.post('/',ProductController.create)
router.get('/:id', authorization, ProductController.findByPk)
router.put('/:id', authorization, ProductController.update)
router.delete('/:id',authorization, ProductController.delete)

module.exports= router