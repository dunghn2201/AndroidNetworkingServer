const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  hash: {
    type: String,
  },
  address: {
    type: String,
  },

  avatar: {
    type: String,
  },
  permission: {
    type: Boolean,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
