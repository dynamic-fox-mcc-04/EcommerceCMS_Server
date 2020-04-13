const router = require('express').Router()
const controller = require('../controllers/product')


router.post('/products', controller.create)


module.exports = router