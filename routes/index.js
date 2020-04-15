const router = require('express').Router()
const userRoutes = require('./user')
const productRoutes = require('./product')

router.get('/', (req, res) => console.log('Successfully connected to server'))
router.use('/users', userRoutes)
router.use('/products', productRoutes)

module.exports = router