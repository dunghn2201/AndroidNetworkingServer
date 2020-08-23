const express = require("express");
const router = express.Router();
const multer = require("../config/multer");
const cors = require("cors");
//controller
const controllerUser = require("../controllers/user.controller");

const User = () => {
  router.post("/api/request-token-api", controllerUser.get_token);
  router.post("/api/register-user", controllerUser.register_user);
  router.post("/api/login-user", controllerUser.login_user);
  router.post("/api/reset-password", controllerUser.reset_password);
  router.put("/api/change-password/:id", controllerUser.change_password);
  router.put("/api/delete-user/:id", controllerUser.deleteUser);
  router.post("/api/search-user/", cors(), controllerUser.searchUser);
  router.put(
    "/api/update-user/:id",
    multer.single("upload"),
    controllerUser.update_user
  );
  return router;
};
module.exports = User;
