const router = require('express').Router();
const CartController = require('../controllers/CartController');
const authentication = require('../middlewares/authentication');
const { customerAuth } = require('../middlewares/authorization');


router.use(authentication);
router.post('/', CartController.add);
router.post('/alt', CartController.addWithBody);
router.get('/', CartController.findAll);
router.patch('/increase/:id', customerAuth, CartController.increase);
router.patch('/decrease/:id', customerAuth, CartController.decrease);
router.delete('/:id', customerAuth, CartController.delete);
// router.post('/checkout', CartController.checkout);

module.exports = router;