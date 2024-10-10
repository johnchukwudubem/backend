const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs"); // Ensure bcrypt is imported
const User = require("../schema/User");

const getAllusers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json(users);
});

const CreateNewUSER = asyncHandler(async (req, res) => {
  const { name, username, email, phone, password } = req.body;
  try {
    const userExist = await User.findOne({ username, email }); // Corrected method
    if (userExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hashing password before saving
    const newUser = await User.create({
      name,
      username,
      email,
      phone,
      password: hashedPassword, // Use hashed password
    });
    res.status(201).json({ message: "Signup successful", newUser });
  } catch (error) {
    res.status(400).json({
      message: "Unable to create user",
      error: error.message,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const loginUser = await User.findOne({ username }); // Corrected method
    if (!loginUser) {
      return res.status(404).json({
        message: "Username not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, loginUser.password);
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    res.status(200).json({
      message: "Login successful",
      loginUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = { getAllusers, CreateNewUSER, login };
