const express = require("express");
const multer = require("multer");
const { protectAdmin } = require("../middleware/authMiddleware.js");
const fileFilter = require("../middleware/fileFilter.js");
const storage = require("../utils/storage-config.js");
const { getProducts, addProduct, getProductByID} = require("../controllers/productController.js");
const router = express.Router();
const upload = multer({ storage, fileFilter });

router.get("/", getProducts);
router.route("/:productID")
  .get(getProductByID)
  .put(protectAdmin)
  .delete(protectAdmin);

router.post("/add", protectAdmin, upload.single('image'), addProduct);
router.get("/all", protectAdmin);
module.exports = router;

// add, update, delete
