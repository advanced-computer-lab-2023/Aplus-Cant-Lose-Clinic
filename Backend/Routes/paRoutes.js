const express = require("express");
const router = express.Router(); // Create an instance of the Express router
const multer = require('multer');
const Patient = require("../Models/patient");

const {
  addPatient,
  addFamilyMember,
  viewFamilyMembers,
  viewDoctors,
  searchDoctorsByNameOrspeciality,
  searchDoctorsByspecialityOrAvailability,
  viewPrescriptions,
  patientFilterAppointments,
  createAppointment,
  viewAppoints,
  viewSpecificPrescription,
  getAlldoctors, 
  freeAppiontmentSlot,
  reserveAppointmentSlot,
  appointmentPatients,
  subscribeToHealthPackage,
  unSubscribeToHealthPackage,
  viewHealthPackagesPatient,
  payWithWallet,
  viewWallet,
  ccSubscriptionPayment,
  healthPackageInfo,
  createCheckoutSession,
  viewPatientHealthRecords
} = require("../controllers/paController");

const { getUser } = require("../controllers/userController");

router.post("/createAppointment/:patientID", createAppointment);
router.post("/addPatient", addPatient);
router.post("/addFamilyMember/:patientId", addFamilyMember);
router.get("/viewFamilyMembers/:patientId", viewFamilyMembers);
router.get("/viewDoctors/:patientId", viewDoctors);
router.get(
  "/searchDoctorsByNameOrspeciality/:patientId",
  searchDoctorsByNameOrspeciality
);
router.get(
  "/searchDoctorsBySpecialtyOrAvailability/:patientId",
  searchDoctorsByspecialityOrAvailability
);
router.get("/viewPrescriptions/:patientId", viewPrescriptions);

router.get("/patientFilterAppointments", patientFilterAppointments);
router.get("/viewAppoints/:patientId", viewAppoints);
router.get("/freeAppiontmentSlot/:doctorId",freeAppiontmentSlot);//used to show all the free slots of specific doctor
router.patch("/reserveAppointmentSlot/:AppointmentId", reserveAppointmentSlot);
router.get("/getUser", getUser);
router.get("/getAlldoctors", getAlldoctors);
router.get("/viewSpecificPrescription/:id", viewSpecificPrescription);
router.get("/appointmentPatients/:doctorId", appointmentPatients);
router.get("/viewPatientHealthRecords/:patientid", viewPatientHealthRecords);

router.patch("/SubscriptionPayment/:patientId/:healthPackageId",payWithWallet);
router.patch("/CCSubscriptionPayment/:patientId/:healthPackageId",ccSubscriptionPayment);




router.patch("/subscribeToHealthPackage", subscribeToHealthPackage);
router.patch("/unSubscribeToHealthPackage", unSubscribeToHealthPackage);


router.get("/viewHealthPackagesPatient/:patientId", viewHealthPackagesPatient);

router.get("/viewWallet/:patientId", viewWallet);
router.get("/healthPackageInfo/:patientId/:healthPackageId", healthPackageInfo);

router.post("/createCheckoutSession/:id/:pid",createCheckoutSession);

router.post('/scheduleAppointment', async (req, res) => {
  try {
    const { doctorId, patientId, appointmentId } = req.body;

    // Check if the doctor and patient exist
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (!doctor || !patient) {
      return res.status(404).json({ message: 'Doctor or Patient not found' });
    }

    // Check if the appointment exists
    const appointment = await Appointment.findOne({
      _id: appointmentId,
      drID: doctorId,
       // Appointment not associated with any patient initially
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found or already scheduled' });
    }

    // Associate the appointment with the patient
    appointment.pID = patientId;
    
    // Calculate appointment price based on doctor's rate and patient's health package
    let appointmentPrice = doctor.rate*100;

    if (patient.hPStatus === 'Subscribed' && patient.hPackage) {
      // Assuming hPackage has a price field
      appointmentPrice -= patient.hPackage.price;
    }

    // Save changes to the appointment
    await appointment.save();

    res.json({ message: 'Appointment scheduled successfully', appointmentPrice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
