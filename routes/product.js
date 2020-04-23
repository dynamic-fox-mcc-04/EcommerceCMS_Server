const router = require("express").Router();
const ProductController = require("../controllers/product");
const authorization = require("../middlewares/authorization");

router.get("/", ProductController.showAll);
router.get("/:id", ProductController.showOne);
//Admin
router.use(authorization);
router.post("/add", ProductController.add);
router.put("/:id/update", ProductController.update);
router.delete("/:id/delete", ProductController.delete);

module.exports = router;