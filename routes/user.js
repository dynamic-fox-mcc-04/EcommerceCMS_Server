const router = require('express').Router()
const Controller = require('../controllers/user.js')
const adminAuth = require('../middlewares/adminAuth')

router.use(adminAuth)
router.post('/register', Controller.register)
router.post('/login', Controller.login)

module.exports = router