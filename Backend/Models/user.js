const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "pharmacist", "patient"], // Define allowed values for the 'role' field
      default: "patient",
      required: true,
    },
  }
);
module.exports = mongoose.model("User", userSchema);
