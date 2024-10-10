const express = require("express");
const { getAllusers, CreateNewUSER } = require("../Controller/User");

const router = express.Router();

// Define the route for getting all users
router.get("/getusers", getAllusers);
router.post("/create", CreateNewUSER)

// Export the router
module.exports = router;
