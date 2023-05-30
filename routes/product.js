const router = require("express").Router();
const upload = require("../cloudinary/multer");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  totalProducts,
} = require("../controllers/product");

router.get("/products", getProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.post("/upload-image", upload.single("image"), uploadImage);
router.get("/products/total", totalProducts);

module.exports = router;
