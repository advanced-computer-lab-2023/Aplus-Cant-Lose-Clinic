const mongoose = require("mongoose");

const drSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Email is required
    },
    email: {
      type: String,
      required: true, // Email is required
      unique: true,
    },
    speciality:{  
      type: String,
      required: true // Email is required
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    Dbirth: Date,
    gender: {
      type: String,
      enum: ["male", "female", "none"], // Define allowed values for the 'role' field
      default: "none",
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    affilation: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    docs: [
      {
        url: String, // Store the URL to the uploaded image
        desc: String, // Optional description for the image
      },
    ],
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"], // Define allowed values for the 'role' field
      default: "pending",
    },

    wallet: {
      type: Number,
     // required: true, // wallet is required
    },
    contract:{
      type: String,
      enum: ["pending", "accepted"], // Define allowed values for the 'role' field
      default: "pending",
    }
  }
);

drSchema.statics.findByUsername = async function (username) {
  return this.find({ username });
};

module.exports = mongoose.model("Doctor", drSchema);
