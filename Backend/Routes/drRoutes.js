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
  addHealthRecord,
  viewWallet,
  acceptContract,
  getDoctor
} = require("../controllers/drController");
const path = require('path');
const multer = require('multer');
const FileDr = require('../Models/fileDr');
const Doctor = require('../Models/doctor');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './files');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  fileFilter(req, file, cb) {
    // Allow any file type
    cb(null, true);
  }
});

router.post(
  '/upload/:id',
  upload.array('files', 3), // Use upload.array to accept multiple files
  async (req, res) => {
    try {
      const files = req.files;

      const fileObjects = files.map((file, index) => ({
        title: index === 0 ? 'id' : index === 1 ? 'degree' : 'license',
        description: 'File description', // You can customize this
        file_path: file.path,
        file_mimetype: file.mimetype
      }));

      await FileDr.create({ files: fileObjects ,drID:req.params.id}); // Corrected typo

      res.send('Files uploaded successfully.');
    } catch (error) {
      console.error(error);
      res.status(400).send('Error while uploading files. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      console.error(error);
      res.status(500).send(error.message);
    }
  }
);

router.get('/download/:drId', async (req, res) => {
  try {
    // Find the patient by ID
    const doctor = await Doctor.findById(req.params.drId);

    if (!doctor) {
      return res.status(404).send('doctor not found');
    }

    // Find the file by ID in the medHist attribute
    const file = doctor.contract;

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
router.get('/getContract/:id', async (req, res) => {
  const doctorId = req.params.id;

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check if the doctor has a contract
    if (!doctor.contract || !doctor.contract.file) {
      return res.status(404).json({ error: 'Contract not found' });
    }

    // Return the contract file path
    res.json({ contract: doctor.contract.file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
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


router.get("/getDoctor/:doctorId", getDoctor);

router.put("/acceptContract/:doctorId", acceptContract);

router.post("/addHealthRecord/:patientID", addHealthRecord);

router.get("/viewWallet/:doctorId",viewWallet );


module.exports = router;
