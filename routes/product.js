const ProductRoute = require('express').Router()
const Controller = require("../controller/controller")
const authentication = require('../middleware/authentication')
const authorizeAdmin = require('../middleware/authorizeAdmin')

ProductRoute.get('/', authentication, Controller.FetchProduct)
ProductRoute.post('/', authentication, authorizeAdmin,Controller.AddProduct)
ProductRoute.patch('/:id', authentication,  authorizeAdmin, Controller.UpdateProduct)
ProductRoute.delete('/:id', authentication,  authorizeAdmin, Controller.DeleteItem)

module.exports = ProductRoute