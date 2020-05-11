const router = require('express').Router()
const controller = require('../controllers/user')


router.post('/login', controller.login)


module.exports = router