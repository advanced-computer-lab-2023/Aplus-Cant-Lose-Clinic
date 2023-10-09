const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const {
  addPatient,
  addFamilyMember,
  viewFamilyMembers,
  viewDoctors,
  searchDoctorsByNameOrSpecialty,
  searchDoctorsBySpecialtyOrAvailability,
  viewPrescriptions,
  patientFilterAppointments,
} = require("../controllers/paController");

const { getUser } = require("../controllers/userController");

router.post("/addPatient", addPatient);
router.post("/addFamilyMember/:patientId", addFamilyMember);
router.get("/viewFamilyMembers/:patientId", viewFamilyMembers);
router.get("/viewDoctors/:patientId", viewDoctors);
router.get("/searchDoctorsByNameOrSpecialty/:patientId", searchDoctorsByNameOrSpecialty);
router.get("/searchDoctorsBySpecialtyOrAvailability/:patientId", searchDoctorsBySpecialtyOrAvailability);
router.get("/viewPrescriptions", viewPrescriptions);
router.get("/patientFilterAppointments", patientFilterAppointments);

router.get("/getUser", getUser);

module.exports = router;
