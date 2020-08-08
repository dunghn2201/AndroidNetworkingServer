const express = require("express");
const router = express.Router();
const multer = require("../config/multer");
//controller
const controllerProduct = require("../controllers/product.controller");

const User = () => {
  router.post(
    "/api/add-product",
    multer.single("upload"),
    controllerProduct.addProduct
  );
  router.post("/api/delete-product/:id", controllerProduct.deleteProduct);
  router.post("/api/update-product/:id", controllerProduct.updateProduct);
  router.get("/api/get-product/:id", controllerProduct.getProductById);
  router.get("/api/get-product-all", controllerProduct.getAllProduct);

  return router;
};
module.exports = User;
