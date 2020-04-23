const routes = require('express').Router()
const user = require('./user.js')
const product = require('./product.js')
const customer = require('./customer.js')
const {autentication} = require('../middleware/autentication.js')

routes.use('/user', user)
//routes for customer
routes.use('/customer', customer)
//routes for admin
routes.use(autentication)
routes.use('/product', product)

module.exports = routes