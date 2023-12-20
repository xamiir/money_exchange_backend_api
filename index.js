const express = require("express");
// const model = require("./model");
const { connectDB } = require("./config/dbconnection");
const UserRoutes = require("./routes/user");
const currenciesRouter = require('./routes/currency');
const transactionsRouter = require('./routes/transactions');

const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
connectDB();

const server = express();

server.use(cors());
server.use(morgan("dev"));

server.use(express.json());
server.use(cookieParser());
//server get request
server.get("/", (req, res) => {
  res.send("Hello World!");
});

server.use("/api", UserRoutes);
server.use('/api', currenciesRouter);
server.use('/api', transactionsRouter);


const port = 5000;
server.listen(port, () => console.log(`Listening on port ${port}`));
