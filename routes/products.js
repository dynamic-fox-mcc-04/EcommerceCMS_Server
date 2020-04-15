const router = require("express").Router()
const auth = require("../middlewares/authentication")
const ProductController = require("../controllers/ProductController")

router.use(auth)
router.post('/', ProductController.create)
router.get('/', ProductController.getAll)
router.put('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)



module.exports = router