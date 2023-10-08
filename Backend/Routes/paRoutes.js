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
router.post("/addFamilyMember", addFamilyMember);
router.get("/viewFamilyMembers", viewFamilyMembers);
router.get("/viewDoctors", viewDoctors);
router.get("/searchDoctorsByNameOrSpecialty", searchDoctorsByNameOrSpecialty);
router.get("/searchDoctorsBySpecialtyOrAvailability", searchDoctorsBySpecialtyOrAvailability);
router.get("/viewPrescriptions", viewPrescriptions);
router.get("/patientFilterAppointments", patientFilterAppointments);

router.get("/getUser", getUser);

module.exports = router;
