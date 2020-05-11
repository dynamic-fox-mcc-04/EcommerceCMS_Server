const router = require('express').Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const cartRoutes = require('./cart');
const errorHandler = require('../middlewares/errorHandler');

router.use(userRoutes);
router.use('/products', productRoutes);
router.use('/carts', cartRoutes);
router.use(errorHandler);

module.exports = router;