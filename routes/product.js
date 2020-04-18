const routes = require('express').Router()
const controller = require('../controller/controller_product.js')
const upload = require('../helper/multer')
const sharp = require('../helper/sharp')

routes.get('/', controller.findAll)
routes.post('/', upload.single('product_image'), sharp, controller.create)
routes.patch('/:id', controller.update)
routes.delete('/:id', controller.delete)

module.exports = routes