const router = require('express').Router()
const controllerProduct = require("../controllers/product")

router.post('/',controllerProduct.addNew)
router.put('/:id',controllerProduct.Edit)
router.delete('/:id',controllerProduct.delete)
router.get('/',controllerProduct.viewall)

module.exports = router