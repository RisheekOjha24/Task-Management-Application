const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (err) {
    console.log("Someone unknown error occured during connection");
    console.log(err);
  }
};

module.exports = dbConnect;
