require("dotenv").config();
const mongoose = require("mongoose");


const URI = process.env.MONGODB_URI;



const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Successfully connected to DB!");
  } catch (error) {
    console.error("Connection failed!" , error);
    process.exit(0);
  }
};

module.exports = connectDb;
