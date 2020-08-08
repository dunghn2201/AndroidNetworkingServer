const Product = require("../models/Product");
const addProduct = (req, res) => {
  new Product({
    product_title: req.body.product_title,
    product_address: req.body.product_address,
    product_phone: req.body.product_phone,
    product_content: req.body.product_content,
    image: req.file.originalname,
    active: false,
  }).save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send({
        status: true,
        message: "Success",
      });
    }
  });
};
const getAllProduct = (req, res) => {
  res.send("getAllProduct");
};
const getProductById = (req, res) => {
  res.send("getProductById");
};
const updateProduct = (req, res) => {
  res.send("updateProduct");
};
const deleteProduct = (req, res) => {
  res.send("deleteProduct");
};
module.exports = {
  addProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
