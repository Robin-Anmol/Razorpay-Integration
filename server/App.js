const express = require("express");
const { config } = require("dotenv");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
config({ path: "./config/config.env" });
app.use(cors());
const route = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", route);
app.get("/api/getKey", (req, res, next) => {
  res.status(200).json({ success: true, Key: process.env.RAZORPAY_KEY_ID });
});

module.exports = { app };
