var express = require('express')
var router = express.Router()
const shoppingCartController = require("../controllers/ShoppingCartController")
const authentication = require("../middlewares/authentication.js")
const userAuthorization = require("../middlewares/userAuthorization")

router.use(authentication)
router.get('/', shoppingCartController.findAll) // bisa lihat semua barang yang sudah dimasukkan ke shoppingCart user yang bersangkutan
router.get('/:id', shoppingCartController.findOne) 

router.post('/', userAuthorization, shoppingCartController.addToCart) // bisa tambahkan barang dari shoppingCart
router.patch('/:id', userAuthorization, shoppingCartController.editQuantity) // bisa update quantity barang dari shoppingCart
router.delete('/:id', userAuthorization, shoppingCartController.deleteProduct)// bisa delete barang dari shoppingCart
router.delete('/', userAuthorization, shoppingCartController.deleteAllProducts)

module.exports = router