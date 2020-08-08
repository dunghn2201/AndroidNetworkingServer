const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  product_title: {
    type: String,
  },
  product_address: {
    type: String,
  },
  product_phone: {
    type: String,
  },
  product_content: {
    type: String,
  },
  image: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});

const Product = mongoose.model("Product", UserSchema);

module.exports = Product;
