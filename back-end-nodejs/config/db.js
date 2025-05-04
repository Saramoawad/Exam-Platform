const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.log(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectToDB;
