const mongoose = require("mongoose");
const followUpSchema = new mongoose.Schema({
  drID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // Reference to the Doctor model
    required: true,
  },
  pID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient", // Reference to the Patient model
    
  },
  patientName:{
    type:String
  },
  requestDate:{type:Date}

  
});
module.exports = mongoose.model("FollowUp", followUpSchema);