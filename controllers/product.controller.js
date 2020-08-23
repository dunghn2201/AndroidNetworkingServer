const Product = require("../models/Product");
const addProduct = (req, res) => {
  new Product({
    name_food: req.body.name_food,
    address_food: req.body.address_food,
    price_food: Number(req.body.price_food).toLocaleString("en"),
    description_food: req.body.description_food,
    numRating_food: Math.floor(Math.random() * 5) + 1,
    image_food: req.file.originalname,
  }).save((err) => {
    if (err) {
      console.log(err);
      res.send({
        status: false,
        message: "Failed Adding",
      });
      return;
    } else {
      res.send({
        status: true,
        message: "Add Product Success",
      });
    }
  });
};

const getProductById = async (req, res) => {
  try {
    console.log(req.params.id);
    let productData = await Product.findById(req.params.id);
    res.send(productData);
    // res.status(200).json({ status: true, productData: productData });
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: "Product not found" });
  }
};
const updateProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      req.params.id,

      req.body,
      {
        useFindAndModify: false,
      }
    );
    // res.send(usersData);
    return res.status(200).json({ status: true, msg: "Successfully" });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Error" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    res.send({
      status: true,
      message: "Delete Product Success",
    });
    // return res
    //   .status(200)
    //   .json({ status: true, msg: "Successfully", user: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Error" });
  }
};

const searchProduct = async (req, res) => {
  var keysearch = req.body.keysearch;
  console.log("keysearch: " + keysearch);
  var regexp = new RegExp("^" + keysearch);
  if (!keysearch) {
    let productData = await Product.find();
    res.send(productData.reverse());
    console.log("productData: " + productData);
  } else {
    await Product.find(
      {
        name_food: regexp,
      },
      function (err, result) {
        if (err) throw err;
        if (result) {
          res.json(result.reverse());
        } else {
          res.send(
            JSON.stringify({
              error: "Error",
            })
          );
        }
      }
    );
  }
};
module.exports = {
  addProduct,
  getProductById,
  searchProduct,
  updateProduct,
  deleteProduct,
};
