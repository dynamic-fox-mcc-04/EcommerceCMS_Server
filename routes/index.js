const routes = require('express').Router()
const user = require('./user.js')
const product = require('./product.js')
const {autentication} = require('../middleware/autentication_admin.js')


routes.use('/user', user)
routes.use(autentication)
routes.use('/product', product)

module.exports = routes