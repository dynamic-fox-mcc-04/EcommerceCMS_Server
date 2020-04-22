const router = require("express").Router();
const ProductController = require("../controllers/product");
const authorization = require("../middlewares/authorization");

router.get("/", ProductController.showAll);
router.get("/product/:id", ProductController.showOne);
//Customer
router.get("/cart", ProductController.showCart);
router.post("/cart/add", ProductController.addCart);
router.patch("/cart/update", ProductController.buy);
//Admin
router.use(authorization);
router.post("/add", ProductController.add);
router.put("/product/:id/update", ProductController.update);
router.delete("/product/:id/delete", ProductController.delete);

module.exports = router;