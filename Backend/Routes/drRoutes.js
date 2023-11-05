const express = require("express");
const router = express.Router(); // Create an instance of the Express router

const { getUser } = require("../controllers/userController");
const { addPrescription } = require("../controllers/drController");
const {
  addDoctor,
  getPatients,
  searchPatientByName,
  patientsInUpcomingApointments,
  editDoctor,
  doctorFilterAppointments,
  appointmentPatients,
  getDr,
  addAppointmentTimeSlot,
  createFollowUpAppointment,
  addHealthRecord

} = require("../controllers/drController");

router.post("/addPrescription", addPrescription);
router.post("/getUser", getUser);
router.post("/addDoctor", addDoctor);
router.get("/getPatients/:id", getPatients);
router.get("/getDr/:id", getDr);
router.post("/addAppointmentSlot/:doctorId", addAppointmentTimeSlot);
router.get("/searchPatientByName", searchPatientByName);
router.post("/createFollowUpAppointment/:drID", createFollowUpAppointment);
router.get(
  "/patientsInUpcomingApointments/:doctorId",
  patientsInUpcomingApointments
);
router.put("/editDoctor/:id", editDoctor);
router.get("/doctorFilterAppointments/:doctorId", doctorFilterAppointments);
router.get("/appointmentPatients/:doctorId", appointmentPatients);




router.post("/addHealthRecord/:patientID", addHealthRecord);


module.exports = router;
