const multer = require("multer");
const path = require("path");
const storageAccount = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const uploadImage = multer({
  storage: storageAccount,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".gif" &&
      ext !== ".jpeg" &&
      ext !== ".bmp" &&
      ext !== ".jfif"
    ) {
      return cb(new Error("Invalid file"));
    }
    cb(null, true);
  },
  limits: { fileSize: 20 * 1024 * 1024 },
});
module.exports = uploadImage;
