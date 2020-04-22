const router = require("express").Router();
const authentication = require("../middlewares/authentication");
const user = require('./user');
const product = require('./product');

router.use("/", user);
router.use(authentication);
router.use("/", product);

module.exports = router;