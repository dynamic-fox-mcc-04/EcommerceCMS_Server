const router = require('express').Router()
const authentication = require('../middlewares/authientication')

router.use(authentication)


module.exports = router