const express = require("express");
// const model = require("./model");
const { connectDB } = require("./config/dbconnection");
const UserRoutes = require("./routes/user");
const CategoryRoutes = require("./routes/category");
const customerRoutes = require("./routes/customer");
const ProductRotues = require("./routes/product");
const cors = require("cors");
const morgan = require("morgan");

connectDB();

const server = express();

server.use(cors());
server.use(morgan("dev"));

server.use(express.json());
//server get request
server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.use("/api", UserRoutes);
server.use("/api", CategoryRoutes);
server.use("/api", customerRoutes);
server.use("/api", ProductRotues);

const port = 8000;
server.listen(port, () => console.log(`Listening on port ${port}`));
