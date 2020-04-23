var express = require('express')
var router = express.Router()
const UserController = require("../controllers/userController.js")

router.post('/register', UserController.register) // satu admin sudah seeded, jadinya endpoint ini hanya akan hasilkan user
router.post('/login', UserController.login) 

module.exports = router