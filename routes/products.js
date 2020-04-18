const router = require("express").Router()
const auth = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")
const ProductController = require("../controllers/ProductController")

router.use(auth)
router.post('/', ProductController.create)
router.get('/', ProductController.getAll)
// router.use(authorization)
router.put('/:id', ProductController.update)
router.get('/:id', authorization, ProductController.getProduct)
router.delete('/:id', ProductController.delete)



module.exports = router