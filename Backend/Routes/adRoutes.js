const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {
  getUser,
} = require("../controllers/userController");

const {
  createAdmin,
  viewPatients,
  deleteAdmin
} = require("../controllers/adController");

// Define your routes and route handlers
router.get("/getUser", getUser);


router.post("/createAdmin", createAdmin);
router.get("/viewPendPh", viewPendPh);
router.get("/viewJoinedPh", viewJoinedPh);
router.get("/viewPatients", viewPatients);
router.delete("/deletePatient", deletePatient);
router.delete("/deleteDoctor", deleteDoctor);
router.delete("/deleteAdmin", deleteAdmin);

module.exports = router; // Export the router instance
