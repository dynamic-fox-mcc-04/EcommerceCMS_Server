const express= require('express')
const router= express.Router()
const ProductController= require('../controller/product')

// router.use(authentication)
router.get('/', ProductController.findAll)
router.post('/',ProductController.create)
router.get('/:id', ProductController.findByPk)
router.put('/:id', ProductController.update)
router.delete('/:id',ProductController.delete)

module.exports= router