const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {
  getUser,
} = require("../controllers/userController");

const {
  createAdmin,
  viewPendDr,
  viewJoinedDr,
  viewPatients,
  deletePatient,
  deleteDoctor,
  deleteAdmin,
  addPack,
  deletePack,
  updatePack,
} = require("../controllers/adController");

// Define your routes and route handlers
router.get("/getUser", getUser);


router.post("/createAdmin", createAdmin);
router.get("/viewPendDr", viewPendDr);
router.get("/viewJoinedDr", viewJoinedDr);
router.get("/viewPatients", viewPatients);
router.delete("/deletePatient", deletePatient);
router.delete("/deleteDoctor", deleteDoctor);
router.delete("/deleteAdmin", deleteAdmin);
router.post("/addPack", addPack);
router.delete("/deletePack", deletePack);
router.put("/updatePack", updatePack);

module.exports = router; // Export the router instance
