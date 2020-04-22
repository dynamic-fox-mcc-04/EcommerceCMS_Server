const Controller = require('../controller/controller')
const CartRoute = require('express').Router()
const authentication = require('../middleware/authentication')
const authorize = require('../helper/userauth')

CartRoute.get('/', authentication, Controller.GetCart)
CartRoute.post('/', authentication, authorize, Controller.AddCart) //tested
CartRoute.patch('/:id', authentication, authorize, Controller.UpdateCart) //tested
CartRoute.delete('/:id', authentication, authorize, Controller.DeleteCart) //tested
CartRoute.get('/order', authentication, authorize, Controller.GetOrder)
CartRoute.patch('/checkout', authentication, Controller.Checkout)



module.exports = CartRoute