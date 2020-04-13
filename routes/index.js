const router = require('express').Router()
const userRoutes = require('./user')

router.get((req, res) => console.log('Successfully connected to server'))
router.use('/users', userRoutes)

module.exports = router