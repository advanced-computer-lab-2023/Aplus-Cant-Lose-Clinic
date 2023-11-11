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
  createCheckoutSession
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
router.patch("/SubscriptionPayment/:patientId/:healthPackageId",payWithWallet);
router.patch("/CCSubscriptionPayment/:patientId/:healthPackageId",ccSubscriptionPayment);




router.patch("/subscribeToHealthPackage", subscribeToHealthPackage);
router.patch("/unSubscribeToHealthPackage", unSubscribeToHealthPackage);


router.get("/viewHealthPackagesPatient/:patientId", viewHealthPackagesPatient);

router.get("/viewWallet/:patientId", viewWallet);
router.get("/healthPackageInfo/:patientId/:healthPackageId", healthPackageInfo);

router.post("/createCheckoutSession/:id/:pid",createCheckoutSession);
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

router.post(
  '/upload/:patient_id',
  upload.single('file'),
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const { path, mimetype } = req.file;
      const patientId = req.params.patient_id;
      console.log('Title:', title);
      console.log('Description:', description);
      console.log('File:', req.file);
      console.log('Patient ID:', patientId);
      // Find the patient by ID
      const patient = await Patient.findById(patientId);
console.log(patient);
      // Add the file to the medHist array
      patient.medHist.push({
        title,
        description,
        file_path: path,
        file_mimetype: mimetype,
      });

      // Save the updated patient
      await patient.save();

      res.send('File uploaded successfully.');
    } catch (error) {
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);
router.delete('/delete/:patient_id/:document_id', async (req, res) => {
  try {
    const patientId = req.params.patient_id;
    const documentId = req.params.document_id;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);

    // Find the index of the document in the medHist array
    const documentIndex = patient.medHist.findIndex(doc => doc._id.toString() === documentId);

    // Check if the document exists in the medHist array
    if (documentIndex !== -1) {
      // Remove the document from the medHist array
      patient.medHist.splice(documentIndex, 1);

      // Save the updated patient
      await patient.save();

      res.send('Document deleted successfully.');
    } else {
      res.status(404).send('Document not found.');
    }
  } catch (error) {
    res.status(400).send('Error while deleting document. Try again later.');
  }
});

router.get('/getAllFiles/:patient_id', async (req, res) => {
  try {
    const patientId = req.params.patient_id;

    // Find the patient by ID
    const patient = await Patient.findById(patientId);

    // Retrieve the medHist array of the patient
    const medHist = patient.medHist;

    res.send(medHist);
  } catch (error) {
    res.status(400).send('Error while getting list of files. Try again later.');
  }
});

module.exports = router;
