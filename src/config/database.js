const mongoose = require("mongoose");
require("dotenv").config();
const { DATABASE_CONNECTION } = process.env;

exports.connect = () => {
  // Connecting to the database
  try {
      mongoose.connect(DATABASE_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });
  console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};