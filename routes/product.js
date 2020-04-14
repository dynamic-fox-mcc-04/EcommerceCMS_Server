const router = require('express').Router()
const Controller = require('../controllers/product.js')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.post('/', Controller.create)
router.get('/', Controller.findAll)
router.delete('/:id', Controller.delete)
router.put('/:id', Controller.put)
router.get('/:id', Controller.findOne)

module.exports = router