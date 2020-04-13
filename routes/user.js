const userRoute = require('express').Router()
const UserController =require("../controller/usercontroller")

userRoute.post('/register', UserController.Register)
userRoute.post('/login', UserController.Login)

module.exports = userRoute