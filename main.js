const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const Color = require("colors");

const app = express();
connectDB()
const ports = process.env.PORT || 4000;



app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/get", (req, res) => {
  res.json(ProductInfo);
});

app.listen(ports, () => console.log(`server running on port ${ports}`.yellow));
    