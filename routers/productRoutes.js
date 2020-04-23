var express = require('express')
var router = express.Router()
const authentication = require("../middlewares/authentication.js")
const adminAuthorization = require("../middlewares/adminAuthorization.js")
const productController = require("../controllers/ProductControllers.js")

// //authentication starts here
router.use(authentication)
router.get("/", productController.findAll)
router.get("/:id", productController.getOneProduct)
// // //authorization starts here
router.post("/", adminAuthorization, productController.addNewProduct)
router.put("/:id", adminAuthorization, productController.updateProduct)
router.delete("/:id", adminAuthorization, productController.deleteProduct) //delete task

module.exports = router