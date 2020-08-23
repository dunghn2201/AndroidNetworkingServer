const User = require("../models/User");
var bcrypt = require("bcrypt");
var nodemailer = require("nodemailer");
const emailExistence = require("email-existence");
const accountMail = require("../config/accountMail.json");
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
            hashed_password: createHash(req.body.hashed_password),
            numberPhone: "Đang cập nhật",
            dateOfbirth: "Đang cập nhật",
            bio: "Đang cập nhật",
            address: "Đang cập nhật",
            avatar: "Đang cập nhật",
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
const change_password = async (req, res) => {
  if (!req.body) {
    return res.send({
      message: "Data to update can not be empty!",
    });
  }
  const AccountInfo = await User.findByIdAndUpdate(req.params.id);
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  bcrypt.compare(currentPassword, AccountInfo.hashed_password, async function (
    err,
    result
  ) {
    if (result == true) {
      await User.findByIdAndUpdate(
        req.params.id,
        {
          hashed_password: createHash(newPassword),
        },
        { useFindAndModify: false },
        (err) => {
          if (err) {
            let state = {
              status: false,
              message: "Failed updating",
            };
            res.send(state);
          } else {
            let state = {
              status: true,
              message: "Changed password successfully",
            };
            res.send(state);
          }
        }
      );
    } else {
      const state = {
        status: false,
        message: "Your current password is wrong",
      };
      res.send(state);
    }
  });
};
const reset_password = async (req, res) => {
  const AccountInfo = await User.findOne({
    email: req.body.email,
  });

  const newPassword = req.body.newPassword;
  console.log(newPassword);
  if (AccountInfo != null) {
    if (newPassword != null) {
      console.log(
        "AccountInfo._id:  " + AccountInfo._id + "newPassword: " + newPassword
      );
      let user = await User.findByIdAndUpdate(AccountInfo._id, {
        hashed_password: createHash(newPassword),
      });
      let result = await user.save();
      let state = {
        status: true,
        message: result,
      };
      res.send(state);
    } else {
      let open_code = Math.floor(Math.random() * 1000000);
      let state = {
        status: true,
        message: open_code,
      };
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: accountMail.email,
          pass: accountMail.password,
        },
      });
      const mailOptions = {
        from: "dorocmeo1999@gmail.com",
        to: req.body.email,
        subject: "Reset Password Request",
        html: `Hello ${AccountInfo.fullName},<br><br>
      &nbsp;&nbsp;&nbsp;&nbsp; Your reset password token is <b>${open_code}</b>.
      Please enter this code to confirm reset password. Thanks<br>.`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          let state = {
            status: false,
            message: "Something went wrong. Please try again",
          };
          res.send(state);
        } else {
          console.log("Email sent: " + info.response);
          res.send(state);
        }
      });
    }
  } else {
    let state = {
      status: false,
      message: "Can't find your account. Please enter a valid email",
    };
    res.send(state);
  }
};
const get_token = async (req, res) => {
  try {
    const AccountInfo = await User.findOne({ email: req.body.email });
    if (AccountInfo.permission) {
      User.find()
        .lean()
        .exec((error, filterData) => {
          // for (var key in data) {
          //   var obj = data[key];
          //   console.log("logg" + obj);
          // }
          filterData.reverse();
          let data = filterData.filter((filterData) => {
            return filterData.permission == false;
          });
          let token = {
            email: AccountInfo.email,
            hashed_password: AccountInfo.hashed_password,
          };
          res.send({ ...AccountInfo._doc, data });
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
      bcrypt.compare(
        req.body.hashed_password,
        AccountInfo.hashed_password,
        async function (err, result) {
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
        }
      );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// const update_user = async (req, res) => {
//   try {
//     await User.findByIdAndUpdate(
//       { _id: req.body._id },
//       {
//         fullName: req.body.fullName,
//         address: req.body.address,
//         avatar: req.file.originalname,
//       },
//       // { new: true },
//       (err, doc) => {
//         if (err) {
//           console.log(err);
//           return;
//         } else {
//           console.log(doc);
//           res.send({
//             result: true,
//             message: "Success",
//           });
//         }
//       }
//     );
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
const update_user = async (req, res, next) => {
  try {
    if (!req.body) {
      res.send({
        message: "Data to update can not be empty!",
      });
    } else {
      AccountInfo = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          useFindAndModify: false,
        },
        function (err, user) {
          if (err) {
            res.send({
              status: false,
              message: "Failed update",
            });
          } else {
            res.send({
              status: true,
              message: "Update Success",
            });
          }
        }
      );

      // console.log(AccountInfo);
      // AccountInfo.set(req.body);
      // let result = await AccountInfo.save();
      // res.send(result);
    }
  } catch (error) {
    // res.status(500).send(error);
    next(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.send({
      status: true,
      message: "Delete User Success",
    });
    // return res
    //   .status(200)
    //   .json({ status: true, msg: "Successfully", user: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Error" });
  }
};
const searchUser = async (req, res) => {
  var keysearch = req.body.keysearch;
  console.log("keysearch: " + keysearch);
  var regexp = new RegExp("^" + keysearch);
  if (!keysearch) {
    let userData = await User.find();
    res.send(userData);
    console.log("productData: " + userData);
  } else {
    await User.find(
      {
        fullName: regexp,
      },
      function (err, result) {
        if (err) throw err;
        if (result) {
          res.json(result);
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
var createHash = function (hash) {
  return bcrypt.hashSync(hash, bcrypt.genSaltSync(10), null);
};
module.exports = {
  register_user,
  login_user,
  get_token,
  searchUser,
  reset_password,
  deleteUser,
  change_password,
  update_user,
};
