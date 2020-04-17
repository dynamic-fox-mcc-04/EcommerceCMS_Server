const ProductRoute = require('express').Router()
const Controller = require("../controller/controller")
const authentication = require('../middleware/authentication')
const authorizeAdmin = require('../middleware/authorizeAdmin')

ProductRoute.get('/', authentication, Controller.FetchProduct) //Tested
ProductRoute.post('/', authentication, authorizeAdmin,Controller.AddProduct) // Tested
ProductRoute.get('/:id', authentication,authorizeAdmin, Controller.getDetails) //Tested
ProductRoute.patch('/:id', authentication,  authorizeAdmin, Controller.UpdateProduct) //Tested
ProductRoute.delete('/:id', authentication,  authorizeAdmin, Controller.DeleteItem)  //Tested

module.exports = ProductRoute