const mongoose = require("mongoose");

const URI =
  "mongodb+srv://xamiir:xamiir_10@cluster0.ifakhb3.mongodb.net/inventory_db";

exports.connectDB = async () => {
  try {
    const conn = await mongoose.connect(URI);
    console.log("MongoDb Connected", conn.connection.host);
  } catch (error) {
    console.log("Connection failed", error);
    process.exit(1);
  }
};
