const express = require("express");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3000 || process.env.IP;
const userRouter = require("./routers/user.router");
const productRouter = require("./routers/product.router");
//cấu hình mongodb
const connectDB = require("./config/db");
connectDB();

//cấu hình form gửi đi
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));
app.use("/", userRouter());
app.use("/", productRouter());

//Khởi chạy server
http
  .createServer(app)
  .listen(PORT, () => console.log(`Server started on port ${PORT}`));
