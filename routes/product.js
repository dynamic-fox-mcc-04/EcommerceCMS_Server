const router = require('express').Router()
const controllerProduct = require("../controllers/product")
const author = require("../middlewares/author")
const authen = require("../middlewares/authen")

router.post('/',controllerProduct.addNew)
router.put('/:id',controllerProduct.Edit)
router.delete('/:id',controllerProduct.delete)
router.get('/',controllerProduct.viewall)

module.exports = router