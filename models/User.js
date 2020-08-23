const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    unique: true,
    type: String,
  },
  numberPhone: {
    type: String,
  },
  dateOfbirth: {
    type: String,
  },
  bio: {
    type: String,
  },
  hashed_password: {
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
