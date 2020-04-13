const routes = require('express').Router()
const controller = require('../controller/controller_user.js')

routes.post('/login', controller.login)
routes.post('/register', controller.register)

module.exports = routes