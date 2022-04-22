const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

//Cors setup
let corsOptions = {
  origin: process.env.NODE_ENV == "PROD" ? "http://localhost:8080" : undefined,
  credentials: true,
  exposedHeaders: ["Authorization"],
};
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const tokenRouter = require("./TokenRouter");

app.use("/token", tokenRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server started on port " + port);
});

module.exports = app;
