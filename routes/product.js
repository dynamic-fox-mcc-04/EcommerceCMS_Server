const ProductRoute = require('express').Router()
const Controller = require("../controller/controller")
const authentication = require('../middleware/authentication')
ProductRoute.get('/', authentication, Controller.FetchProduct)
ProductRoute.post('/', authentication, Controller.AddProduct)
ProductRoute.patch('/:id', authentication, Controller.UpdateProduct)
ProductRoute.delete('/:id', authentication, Controller.DeleteItem)

module.exports = ProductRoute