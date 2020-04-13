const router = require('express').Router()
const controllerProduct = require("../controllers/product")
const author = require("../middlewares/author")
const authen = require("../middlewares/authen")

router.post('/',authen,controllerProduct.addNew)
router.put('/:id',authen,author,controllerProduct.Edit)
router.delete('/:id',authen,author,controllerProduct.delete)
router.get('/',controllerProduct.viewall)

module.exports = router