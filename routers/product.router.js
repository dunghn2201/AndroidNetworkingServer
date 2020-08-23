const express = require("express");
const router = express.Router();
const multer = require("../config/multer");
const cors = require("cors");
//controller
const controllerProduct = require("../controllers/product.controller");

const Product = () => {
  router.post(
    "/api/add-product",
    multer.single("upload"),
    controllerProduct.addProduct
  );
  router.put("/api/delete-product/:id", controllerProduct.deleteProduct);
  router.put(
    "/api/update-product/:id",
    multer.single("upload"),
    controllerProduct.updateProduct
  );
  router.post("/api/get-product-by-id/:id", controllerProduct.getProductById);
  router.post("/api/search-product/", cors(), controllerProduct.searchProduct);
  return router;
};
module.exports = Product;
