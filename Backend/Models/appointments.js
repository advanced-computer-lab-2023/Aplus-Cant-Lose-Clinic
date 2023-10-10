const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  drID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // Reference to the Doctor model
    required: true,
  },
  pID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient model
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "uncompleted"], // Define allowed values for status
    default: "uncompleted", // Set a default value if not provided
  },
  Description: String,
});
module.exports = mongoose.model("Appointment", appointmentSchema);