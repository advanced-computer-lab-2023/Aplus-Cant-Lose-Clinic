const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const { getUser } = require("../controllers/userController");
const {
  addDoctor,
  getPatients,
  searchPatientByName,
  patientsInUpcomingApointments,
  filterPrescriptions,
  editDoctor,
  doctorFilterAppointments,
} = require("../controllers/drController");

router.get("/getUser", getUser);
router.post("/addDoctor", addDoctor);
router.get("/getPatients", getPatients);
router.get("/searchPatientByName", searchPatientByName);
router.get("/patientsInUpcomingApointments/:doctorId", patientsInUpcomingApointments);
router.get("/filterPrescriptions/:patientId", filterPrescriptions);
router.put("/editDoctor/:id", editDoctor);
router.get("/doctorFilterAppointments", doctorFilterAppointments);

module.exports = router;
