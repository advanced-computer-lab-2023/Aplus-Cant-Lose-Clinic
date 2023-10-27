const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {
  getUser,
} = require("../controllers/userController");

const {
  createAdmin,
  viewPendDr,
  viewMedicine,
  viewJoinedDr,
  viewPatients,
  deletePatient,
  deleteDoctor,
  deleteAdmin,
  addPack,
  deletePack,
  viewHealthP,
  updatePack,
  viewAdmin,
  sendAcceptEmail,sendRejectEmail
} = require("../controllers/adController");

// Define your routes and route handlers
router.get("/getUser", getUser);
router.get("/viewAdmin",viewAdmin);
router.get("/viewMedicine", viewMedicine);
router.post("/createAdmin", createAdmin);
router.get("/viewPendDr", viewPendDr);
router.get("/viewJoinedDr", viewJoinedDr);
router.get("/viewPatients", viewPatients);
router.delete("/deletePatient/:id", deletePatient);
router.delete("/deleteDoctor/:id", deleteDoctor);
router.delete("/deleteAdmin/:id", deleteAdmin);
router.post("/addPack", addPack);
router.delete("/deletePack/:id", deletePack);
router.put("/updatePack/:id", updatePack);
router.get("/viewHealthP", viewHealthP);
router.post("/sendAcceptEmail", sendAcceptEmail);
router.post("/sendRejectEmail", sendRejectEmail);
module.exports = router; // Export the router instance
