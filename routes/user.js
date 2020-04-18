const routes = require('express').Router()
const controller = require('../controller/controller_user.js')

routes.post('/login', controller.login)
routes.post('/register', controller.register)
routes.get('/', controller.findAll)

module.exports = routes