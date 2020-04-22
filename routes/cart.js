const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cartController')
const { userAuthorization } = require('../middlewere/authorization')

router.post('/', CartController.create)
router.get('/', CartController.display)
router.patch('/increase/:id', userAuthorization, CartController.increase)
router.patch('/decrease/:id', userAuthorization, CartController.decrease)
router.delete('/:id', userAuthorization, CartController.delete)

module.exports = router