var express = require('express')
var router = express.Router()
const UserController = require("../controllers/userController.js")

router.post('/register', UserController.register) // admin sudah seeded, jadinya endpoint ini tidak diperlukan
router.post('/login', UserController.login)

module.exports = router