const router = require('express').Router();
const ProductController = require('../controllers/ProductController');
const authentication = require('../middlewares/authentication');
const { adminAuth } = require('../middlewares/authorization');

router.get('/', ProductController.findAll);
router.get('/:id', ProductController.findOne);
router.use(authentication);
router.post('/', adminAuth, ProductController.add);
router.put('/:id', adminAuth, ProductController.update);
router.delete('/:id', adminAuth, ProductController.delete);

module.exports = router