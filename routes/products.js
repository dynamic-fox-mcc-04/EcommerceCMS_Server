const router = require("express").Router()
const auth = require("../middlewares/authentication")
const ProductController = require("../controllers/ProductController")

router.post('/products', auth, ProductController.create)



module.exports = router