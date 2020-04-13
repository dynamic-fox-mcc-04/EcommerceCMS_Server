const router = require('express').Router()
const products = require('./productRouter.js')
const users = require('./userRouter.js')
    // const categories = require('./categoryRouter.js')

router.use('/users', users)
router.use('/products', products)
    // router.use('/categories', categories)

module.exports = router