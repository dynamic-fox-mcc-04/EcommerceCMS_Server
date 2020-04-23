const router = require("express").Router();
const ProductController = require("../controllers/product");

//Customer
router.get("/", ProductController.showCart);
router.post("/add", ProductController.addCart);
router.patch("/update", ProductController.buy);
router.delete("/:id/delete", ProductController.removeOrder);

module.exports = router;