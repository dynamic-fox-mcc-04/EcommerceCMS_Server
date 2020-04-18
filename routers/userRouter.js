var express = require('express')
var router = express.Router()
const UserController = require("../controllers/userController.js")

router.get('/', function(req,res){ 
    res.status(200).json({
        message:'home-domain-connected'
    })
})

router.post('/register', UserController.register) // admin sudah seeded, jadinya endpoint ini tidak diperlukan
router.post('/login', UserController.login)

module.exports = router