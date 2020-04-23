const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const user = require('./user');
const product = require('./product');
const order = require('./order');

router.use("/", user);
router.use(authentication);
router.use("/product", product);
router.use("/order", order);

module.exports = router;