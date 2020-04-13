const userRoute = require('express').Router()
const UserController =require("../controller/usercontroller")

userRoute.post('/register', UserController.Register)

module.exports = userRoute