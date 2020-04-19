const router = require('express').Router()
const Controller = require('../controllers/product.js')
const authentication = require('../middlewares/authentication')

router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.use(authentication)
router.post('/', Controller.create)
router.delete('/:id', Controller.delete)
router.put('/:id', Controller.put)

module.exports = router