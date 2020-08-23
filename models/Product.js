const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name_food: {
    type: String,
  },
  address_food: {
    type: String,
  },
  price_food: {
    type: String,
  },
  description_food: {
    type: String,
  },
  numRating_food: {
    type: String,
  },
  image_food: {
    type: String,
  },
});

const Product = mongoose.model("Product", UserSchema);

module.exports = Product;
