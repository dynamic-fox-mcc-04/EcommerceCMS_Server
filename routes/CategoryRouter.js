const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController.js')

router.post('/', CategoryController.addCategory)

module.exports = router