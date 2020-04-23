const routes = require('express').Router()
const userRoute = require("./user")
const productRoute = require('./product')
const cartroute = require('./cart')

routes.get('/', function(req, res) {
    res.status(200).json({
        msg: 'Home Domain Connected'
    })
})

routes.use('/user', userRoute)
routes.use('/product', productRoute)
routes.use('/cart', cartroute)

module.exports = routes