const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    IsAdmn: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/, // Email format validation
    },
    address: {
      street: { type: String },
      suite: { type: String },
      city: { type: String },
      zipcode: { type: String },
      geo: {
        lat: { type: String },
        lng: { type: String },
      },
    },
    phone: {
      type: String, // Consider String for phone numbers
      required: true,
    },
    website: {
      type: String,
      default: "https://go.com", // Fixed URL format
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Adjusted password length
      maxlength: 20,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
