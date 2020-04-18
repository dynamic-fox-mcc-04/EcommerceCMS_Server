const router = require('express').Router();
const UserController = require('../controllers/UserController');

router.get('/', UserController.findAll);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/login/admin', UserController.loginAdmin);
router.delete('/:id', UserController.delete);

module.exports = router;