const express = require("express");
const router = express.Router(); // Create an instance of the Express router
const multer = require('multer');
const Patient = require("../Models/patient");
const Doctor = require("../Models/doctor");
const Appointment = require("../Models/appointments");
const path = require('path');

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


const fs = require('fs').promises; // Import the 'fs' module for file deletion


router.patch("/subscribeToHealthPackage", subscribeToHealthPackage);
router.patch("/unSubscribeToHealthPackage", unSubscribeToHealthPackage);


router.get("/viewHealthPackagesPatient/:patientId", viewHealthPackagesPatient);

router.get("/viewWallet/:patientId", viewWallet);
router.get("/healthPackageInfo/:patientId/:healthPackageId", healthPackageInfo);

router.post("/createCheckoutSession/:id/:h_id",createCheckoutSession);

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
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './medHist');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

router.post('/upload/:id', upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const { path, mimetype } = req.file;

    // Find the patient by ID
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    // Add the uploaded file to the patient's medHist attribute
    patient.medHist.push({
      title,
      description,
      file_path: path,
      file_mimetype: mimetype,
    });

    // Save the updated patient
    await patient.save();

    // Save the file details to your File model if needed


    res.send('File uploaded and added to patient\'s medHist successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while uploading file. Try again later.');
  }
});

router.get('/getAllFiles/:id', async (req, res) => {
  try {
    // Find the patient by ID
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    // Extract files from the medHist attribute
    const files = patient.medHist;

    // Sort files by creation date if they have a createdAt property
    const sortedByCreationDate = files.sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );

    res.send(sortedByCreationDate);
  } catch (error) {
    console.error(error);
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

router.get('/download/:id/:pid', async (req, res) => {
  try {
    // Find the patient by ID
    const patient = await Patient.findById(req.params.pid);

    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    // Find the file by ID in the medHist attribute
    const file = patient.medHist.find((f) => f._id.toString() === req.params.id);

    if (!file) {
      return res.status(404).send('File not found');
    }

    res.set({
      'Content-Type': file.file_mimetype
    });

    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    console.error(error);
    res.status(400).send('Error while downloading file. Try again later.');
  }
});


router.get('/delete/:id/:pid', async (req, res) => {
  try {
    // Find the patient by ID
    const patient = await Patient.findById(req.params.pid);

    if (!patient) {
      return res.status(404).send('Patient not found');
    }

    // Find the file by ID in the medHist attribute
    const fileIndex = patient.medHist.findIndex((f) => f._id.toString() === req.params.id);

    if (fileIndex === -1) {
      return res.status(404).send('File not found');
    }

    // Delete the file from the file system
  //  await fs.unlink(path.join(__dirname, 'medHist', patient.medHist[fileIndex].file_path));

    // Remove the file from the medHist array
    patient.medHist.splice(fileIndex, 1);

    // Save the updated patient
    await patient.save();



    res.send('File deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(400).send('Error while deleting file. Try again later.');
  }
});

module.exports = router;
