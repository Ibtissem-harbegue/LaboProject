const mongoose = require("mongoose");
const config = require("config");



const connectDB = async () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URI || config.get("MONGO_URI"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => (err ? console.log(err) : console.log("Database is connected"))
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
