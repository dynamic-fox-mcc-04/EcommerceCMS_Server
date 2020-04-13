const router = require("express").Router();

router.post("/login");
router.post("/register");
router.use("/product");

module.exports = router;