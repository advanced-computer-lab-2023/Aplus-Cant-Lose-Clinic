const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    Date: Date,
    drID: mongoose.Schema.Types.ObjectId,
    pID: mongoose.Schema.Types.ObjectId,
    Description: String
  }
);
module.exports = mongoose.model("Appointment", appointmentSchema);