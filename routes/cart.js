const routes = require('express').Router()
const controller = require('../controller/controller_cart')

routes.get('/', controller.findByUser)
routes.post('/', controller.create)
routes.patch('/:id', controller.patchUpdate)
routes.delete('/:id', controller.delete)

module.exports = routes