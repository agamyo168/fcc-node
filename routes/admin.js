const path = require("path");

const express = require("express");

const {
  getProducts,

  getAddProduct,
  getEditProduct,
  postAddProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");

const router = express.Router();

// /admin/products => GET
router.get("/products", getProducts);

// /admin/add-product => GET
router.get("/add-product", getAddProduct);

// /admin/edit-product
router.get("/edit-product/:productId", getEditProduct);

// /admin/add-product => POST
router.post("/add-product", postAddProduct);

router.post("/edit-product", postEditProduct);

router.post("/delete-product", postDeleteProduct);

module.exports = router;
