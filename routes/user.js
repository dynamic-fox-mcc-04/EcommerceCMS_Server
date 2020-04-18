const router = require('express').Router()
const Controller = require('../controllers/user.js')
const adminAuth = require('../middlewares/adminAuth')

router.post('/register', Controller.register)
router.post('/login', adminAuth, Controller.login)

module.exports = router