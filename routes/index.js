const router = require("express").Router();
const UserController = require("../controllers/user");
const ProductController = require("../controllers/product");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use(authentication);
router.get("/", ProductController.showAll);
router.get("/product/:id", ProductController.showOne);
router.put("/product/:id/update", ProductController.update);
router.use(authorization);
router.post("/add", ProductController.add);
router.delete("/product/:id/delete", ProductController.delete);

module.exports = router;