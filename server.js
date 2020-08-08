const express = require("express");
const http = require("http");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const userRouter = require("./src/routers/user.router");
const productRouter = require("./src/routers/product.router");
//cấu hình mongodb
const connectDB = require("./src/config/db");
connectDB();

//cấu hình form gửi đi
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));
app.use("/", userRouter());
app.use("/", productRouter());

//Khởi chạy server
http
  .createServer(app)
  .listen(PORT, () => console.log(`Server started on port ${PORT}`));
