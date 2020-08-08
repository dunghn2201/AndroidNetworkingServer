const User = require("../models/User");
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const emailExistence = require("email-existence");

const register_user = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    emailExistence.check(req.body.email, function (request, response) {
      if (response) {
        if (user) {
          return res.send({
            status: false,
            message: "User already exists",
          });
        } else {
          new User({
            fullName: req.body.fullName,
            email: req.body.email,
            hash: createHash(req.body.hash),
            address: "Đang cập nhật",
            avatar: "No image",
            permission: false,
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
        }
      } else {
        return res.send({
          status: false,
          message: "Email không này không tồn tại",
        });
      }
    });
  });
};

const get_token = async (req, res) => {
  try {
    const AccountInfo = await User.findOne({ email: req.body.email });
    if (AccountInfo.permission) {
      User.find()
        .lean()
        .exec((error, data) => {
          // for (var key in data) {
          //   var obj = data[key];
          //   console.log("logg" + obj);
          // }
          let filterData = data.filter((data) => {
            return data.permission == false;
          });
          let token = { email: AccountInfo.email, hash: AccountInfo.hash };
          res.send({ ...AccountInfo._doc, filterData });
          console.log(token);
          if (error) {
            log(error);
          }
        });
    } else {
      let data = [{ data: null }];
      res.send({ ...AccountInfo._doc, data });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const login_user = async (req, res) => {
  try {
    const AccountInfo = await User.findOne({
      email: req.body.email,
    });
    const status = {
      status: true,
      message: "Account successfully",
    };
    if (!AccountInfo) {
      let ObjectNew = {
        status: false,
        message: "Account not found",
      };
      res.send(ObjectNew);
    } else {
      bcrypt.compare(req.body.hash, AccountInfo.hash, async function (
        err,
        result
      ) {
        let data = { ...AccountInfo._doc };
        if (result == true) {
          res.send({
            ...status,
            data,
          });
        } else {
          const ObjectNew = {
            status: false,
            message: "Password is incorrect",
          };
          res.send(ObjectNew);
        }
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const update_user = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.body._id },
      {
        fullName: req.body.fullName,
        address: req.body.address,
        avatar: req.file.originalname,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log(doc);
          res.send({
            result: true,
            message: "Success",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

const upload_file = (req, res) => {
  console.log(req.file);
  console.log(req.body);
  console.log(req.file.filename);
};
var createHash = function (hash) {
  return bcrypt.hashSync(hash, bcrypt.genSaltSync(10), null);
};
module.exports = {
  register_user,
  login_user,
  get_token,
  upload_file,
  update_user,
};
