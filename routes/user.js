const router = require('express').Router()
const Controller = require('../controllers/user.js')
const adminAuth = require('../middlewares/adminAuth')
const authentication = require('../middlewares/authentication')

router.post('/register', Controller.register)
router.post('/login', adminAuth, Controller.login)
router.get('/', authentication, Controller.findAll)

module.exports = router