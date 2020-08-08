const express = require("express");
const router = express.Router();
const multer = require("../config/multer");
//controller
const controllerUser = require("../controllers/user.controller");

const User = () => {
  router.post("/api/request-token-api", controllerUser.get_token);
  router.post("/api/register-user", controllerUser.register_user);
  router.post("/api/login-user", controllerUser.login_user);
  router.post(
    "/api/update-user/",
    multer.single("upload"),
    controllerUser.update_user
  );
  return router;
};
module.exports = User;
