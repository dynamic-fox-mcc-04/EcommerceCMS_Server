const routes = require('express').Router()
const cart = require('./cart')
const product = require('./product')
const {autentication} = require('../middleware/autentication.js')

routes.use('/product', product)
routes.use(autentication)
routes.use('/cart', cart)

module.exports = routes