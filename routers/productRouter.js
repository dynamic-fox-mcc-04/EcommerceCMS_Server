var express = require('express')
var router = express.Router()
const authentication = require("../middlewares/authentication.js")
const authorization = require("../middlewares/authorization.js")
const productController = require("../controllers/productController.js")

// //authentication starts here
router.use(authentication)
router.get("/", productController.findAll)
router.get("/:id", productController.getOneProduct)
// // //authorization starts here
router.post("/", authorization, productController.addNewProduct)
router.put("/:id", authorization, productController.updateProduct)
router.delete("/:id", authorization, productController.deleteProduct) //delete task

module.exports = router