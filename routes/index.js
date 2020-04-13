const routes = require('express').Router()
const userRoute = require("./user")
const productRoute = require('./product')

routes.get('/', function(req, res) {
    res.status(200).json({
        msg: 'Home Domain Connected'
    })
})

routes.use('/user', userRoute)
routes.use('/product', productRoute)

module.exports = routes