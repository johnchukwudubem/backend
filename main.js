const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./Routes/user");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const Color = require("colors");
const app = express();
connectDB();
const port = process.env.port;

app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRoutes);
app.listen(port, () => console.log(`server runnimg on port ${port}`.yellow));
app.use(express.json);
