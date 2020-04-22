const router = require('express').Router()
const Controller = require('../controllers/product.js')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', Controller.findAll)
router.get('/:id', authorization, Controller.findOne)
router.use(authentication)
router.post('/', Controller.create)
router.delete('/:id', authorization, Controller.delete)
router.put('/:id', authorization, Controller.put)

module.exports = router