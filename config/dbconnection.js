// const mongoose = require("mongoose");

// // const URI = "mongodb://127.0.0.1:27017/App_DB";

// const URI =
//   "mongodb+srv://xamiir:xamiir_10@cluster0.ifakhb3.mongodb.net/App_DB";
  


// exports.connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(URI);
//     console.log("MongoDb Connected", conn.connection.host);
//   } catch (error) {
//     console.log("Connection failed", error);
//     process.exit(1);
//   }
// };

const mongoose = require("mongoose");

const URL = "mongodb+srv://xamiir:xamiir_10@cluster0.ifakhb3.mongodb.net/App_DB";

exports.connectDB = async()=>{
  try{
    const conn = await mongoose.connect(URL);
    console.log("MongoDB is connect ", conn.connection.host)

  }catch(err){
    console.log("mongoDB error" ,err)
    process.exit(1)
  }
}