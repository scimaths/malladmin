const router = require("express").Router();
const productController = require("./controller");

// const multerInstance = require('../multer')
// router.post("/", multerInstance.upload.single('image'), productController.createProduct);

router.post("/add_product", productController.addProduct);
router.get("/get_products", productController.getProducts);
router.post("/get_this_product/", productController.getProductById);
router.get("/next_id", productController.nextID);
router.post("/increase_stock", productController.increaseStock);
router.delete("/:id", productController.removeProduct);
module.exports = router;