const Controller = require('../controller/controller')
const CartRoute = require('express').Router()
const authentication = require('../middleware/authentication')
const authorize = require('../helper/userauth')

CartRoute.patch('/checkout', authentication, authorize, Controller.Checkout) //tested
CartRoute.get('/', authentication, Controller.GetCart) //tested
CartRoute.post('/', authentication, authorize, Controller.AddCart) //tested
CartRoute.put('/:id', authentication, authorize, Controller.UpdateCart) //tested
CartRoute.delete('/:id', authentication, authorize, Controller.DeleteCart) //tested
CartRoute.get('/order', authentication, authorize, Controller.GetOrder) //tested
CartRoute.get('/:id', authentication, authorize, Controller.GetCartDetail) //tested



module.exports = CartRoute