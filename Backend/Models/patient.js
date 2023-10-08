const mongoose = require("mongoose");

const paSchema = new mongoose.Schema(
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
    username: {
      type: String,
      required: true,
      unique: true,
    },
    dBirth: Date,
    gender: {
      type: String,
      enum: ["male", "female", "none"], // Define allowed values for the 'role' field
      default: "none",
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    emergencyContact: {
      fullName: String,
      mobile: Number,
      relation: String,
    },
    family: [
      {
        fullName: String,
        NID: {
          type: Number,
          unique: true,
        },
        age: Number,
        gender:{
          type: String,
          enum: ["male", "female", "none"], // Define allowed values for the 'role' field
          default: "none",
        },
        relation: {
          type: String,
          enum: ["spouse", "child"] // Define allowed values for the 'role' field
        },
      }
    ],
    doctors: [
      {
        username: String,
      }
    ],
    hPackage: mongoose.Schema.Types.ObjectId,
    perscriptions:[
      {
        medID: mongoose.Schema.Types.ObjectId,
      }
    ]
  }
);

paSchema.statics.findByUsername = async function (username) {
  return this.find({ username });
};

module.exports = mongoose.model("Patient", paSchema);
