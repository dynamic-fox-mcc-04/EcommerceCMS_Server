const router = require('express').Router()
const user = require('./user')
const admin = require('./admin')
const product = require('./product')

router.get('/', (err, res) => {
    res.send({ message: 'Connected!' })
})

router.use('/', user)
router.use('/admin', admin)
router.use('/products', product)
module.exports = router