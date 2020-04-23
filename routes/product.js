const router = require('express').Router()
const controller = require('../controllers/product')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.get('/products', controller.read)
router.use(authentication)
router.post('/products', controller.create)
router.put('/products/:id', authorization,controller.update)
router.delete('/products/:id', authorization,controller.delete)


module.exports = router