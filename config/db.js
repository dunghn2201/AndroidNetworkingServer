const mongoose = require("mongoose");
MONGO_URI =
  "mongodb+srv://Dunghn:pd02792@cluster0.ktca4.mongodb.net/dbUser2792?retryWrites=true&w=majority";
const connectDB = async () => {
  const conn = await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
module.exports = connectDB;
