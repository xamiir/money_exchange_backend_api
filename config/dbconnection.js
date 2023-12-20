const mongoose = require("mongoose");

const URI = "mongodb://127.0.0.1:27017/App_DB";

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log("MongoDb Connected", conn.connection.host);
  } catch (error) {
    console.log("Connection failed", error);
    process.exit(1);
  }
};
