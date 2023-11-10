const Doctor = require("../Models/doctor");
const Pharmacist = require("../Models/pharmacist");
const User = require("../Models/user");
const Patient = require("../Models/patient");
const validator = require("validator");
const Appointment = require("../Models/appointments");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      Dbirth,
      gender,
      rate, speciality,
      affilation,
      background,
      docs,
      password,

    } = req.body;
    console.log(req.body);
    // Validate input fields
    if (
      !name ||
      !email ||
      !username ||
      !Dbirth ||
      !gender ||
      !rate ||
      !affilation ||
      !background ||
      !docs ||
      !password || !speciality
    ) {
      // return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if the username is already in use
    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const emailFound = await Patient.findOne({ email });
    const emailFound2 = await Doctor.findOne({ email });
    const emailFound3 = await Pharmacist.findOne({ email });
    if (emailFound || emailFound2 || emailFound3) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Password strength validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }

    // Calculate age based on date of birth
    const today = new Date();
    const birthDate = new Date(Dbirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check if the doctor is at least 18 years old and not over 150 years old
    if (age < 18 || age > 150) {
      return res.status(400).json({ error: "Doctor must be at least 18 and within reasonable age" });
    }

    // Default status is "pending"
    const status = "pending";

    // Create the Doctor and user records
    const doctor = await Doctor.create({
      name,
      email,
      username,
      Dbirth,
      gender,
      rate,
      affilation,
      background,
      docs,
      speciality,
      status,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: "doctor",
    });
    const data = {
      _id: doctor._id,
    };

    const token = generateToken(data);
    res
      .status(201)
      .json({ message: "Doctor created successfully", doctor, token });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const searchPatientByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate the 'name' parameter
    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'name' parameter" });
    }

    // Perform the patient search by name (partial match)
    const patients = await Patient.find({
      name: { $regex: name, $options: "i" },
    });

    if (patients.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Send a successful response with a 200 status code
    res
      .status(200)
      .json({ message: "Patients retrieved successfully", patients });
  } catch (error) {
    console.error("Error searching for patients by name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const patientsInUpcomingApointments = async (req, res) => {
  try {
    const { doctorId } = req.params; // Assuming the doctor's ID is provided in the request parameters

    const currentDate = new Date();

    // Find upcoming appointments for the specific doctor where the appointment date is greater than the current date
    const upcomingAppointments = await Appointment.find({
      drID: doctorId,
      startDate: { $gt: currentDate },
    });

    if (!upcomingAppointments || upcomingAppointments.length === 0) {
      return res.status(404).json({
        error: "No upcoming appointments found for the specified doctor",
      });
    }

    // Extract patient IDs from upcoming appointments
    const patientIds = upcomingAppointments.map(
      (appointment) => appointment.pID
    );

    // Find the associated patients
    const patients = await Patient.find({ _id: { $in: patientIds } });

    if (!patients || patients.length === 0) {
      return res
        .status(404)
        .json({ error: "No patients found for upcoming appointments" });
    }

    return res
      .status(200)
      .json({ message: "Patients in upcoming appointments", patients });
  } catch (error) {
    console.error("Error retrieving patients in upcoming appointments:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



const editDoctor = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  const { email, rate, affiliation } = req.body; // Get the updated values from the request body

  // Check if at least one of the fields (email, rate, affiliation) is provided
  if (!email && !rate && !affiliation) {
    return res.status(400).json({ error: "At least one input is required" });
  }

  try {
    // Check for email duplicates in doctor, patient, and pharmacist tables
    const emailExists =
      (await Doctor.findOne({ email })) ||
      (await Patient.findOne({ email })) ||
      (await Pharmacist.findOne({ email }));


    // Find the doctor by ID and update the specified fields
    const updatedDoctor = await Doctor.updateOne({ _id: id }, { $set: { email, rate, affiliation } })


    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res
      .status(200)
      .json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const
  appointmentPatients = async (req, res) => {
    try {
      const doctorId = req.params.doctorId; // Assuming the doctor's ID is in the request params

      // Use Mongoose to find all appointments for the specified doctor
      const appointments = await Appointment.find({ drID: doctorId })
        .populate('pID') // Populate the 'pID' field to get patient data
        .exec();

      res.json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const doctorFilterAppointments = async (req, res) => {
  const { doctorId } = req.params; // Get doctorId from URL parameters
  const { startDate, endDate, status } = req.query;

  // Check if at least one filter parameter is provided
  if (!startDate && !endDate && !status) {
    return res
      .status(400)
      .json({ error: "At least one filter parameter is required" });
  }

  // Build the query object based on the provided parameters
  const query = {
    drID: doctorId,
  };

  if (startDate) {
    query.startDate = { $gte: new Date(startDate) };
  }

  if (endDate) {
    query.endDate = { $lte: new Date(endDate) };
  }

  if (status) {
    query.status = status;
  }

  try {
    // Find appointments that match the query
    const appointments = await Appointment.find(query);

    res
      .status(200)
      .json({ message: "Appointments filtered successfully", appointments });
  } catch (error) {
    console.error("Error filtering appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Import the Patient model

const getPatients = async (req, res) => {
  try {
    const doctorID = req.params.id; // Retrieve doctor ID from route parameter

    // Find patients associated with the specified doctor ID
    const patients = await Patient.find({ "doctors.doctorID": doctorID });

    if (!patients || patients.length === 0) {
      return res
        .status(404)
        .json({ error: "No patients found for this doctor" });
    }

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error getting patients:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const Prescription = require('../Models/prescription'); // Import the Prescription model

const addPrescription = async (req, res) => {
  try {
    const { medID, patientID, doctorID, datePrescribed } = req.body;

    // Validate inputs
    if (!medID || !patientID || !doctorID || !datePrescribed) {
      return res.status(400).json({ error: "Missing required  input fields" });
    }

    // Create a new prescription instance with the provided data
    const prescription = new Prescription({
      medID,
      patientID,
      doctorID,
      datePrescribed,

    });

    // Save the prescription to the database
    const savedPrescription = await prescription.save();

    res.status(201).json({
      message: "Prescription added successfully",
      prescription: savedPrescription,
    });
  } catch (error) {
    console.error("Error adding prescription:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDr = async (req, res) => {
  const doctorId = req.params.id; // Get doctorId from URL parameters



  try {
    // Find appointments that match the query
    const dr = await Doctor.findById(doctorId);

    res
      .status(200)
      .json({ message: "dr found successfully", dr });
  } catch (error) {
    console.error("Error filtering appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addAppointmentTimeSlot = async (req, res) => {
  try {
    const doctorId = req.params.doctorId; // Assuming the doctor's ID is in the request params
    const { startDate,endDate} = req.body;

    // Validate inputs
    if (!startDate ||
      !endDate ) {
      return res.status(400).json({ error: "Missing required  input fields" });
    }

    // Create a new Appointment instance with the provided data
    const appointment = await Appointment.create({
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      drID:doctorId,
      pID:"65480dbbdde936238045fdd3",
      status:"Not_Reserved",
      Description: "",
    });

    res.status(201).json({
      message: "Appointment added successfully",
      Appointment: appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}// note that to initialize+ the PID it should have id which will be the fake patient id till it get reserved
const createFollowUpAppointment = async (req, res) => {
  try {
    const drID = req.params.drID; // Retrieve doctor ID
    const { patientID } = req.query; // Retrieve patientID
    const { startDate, endDate } = req.body;

    // Validate inputs
    if (!startDate || !endDate || !patientID) {
      return res.status(400).json({ error: "Missing required input fields" });
    }

    const patient = await Patient.findById(patientID);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the doctor has any overlapping appointments
    const doctorHasOverlappingAppointments = await Appointment.exists({
      drID: drID,
      $and: [
        { startDate: { $lt: endDate } },
        { endDate: { $gt: startDate } },
      ],
    });

    if (doctorHasOverlappingAppointments) {
      return res
        .status(400)
        .json({ error: "Doctor already has appointments during this time" });
    }

    // Check if the patient has any overlapping appointments
    const patientHasOverlappingAppointments = await Appointment.exists({
      pID: patientID,
      $and: [
        { startDate: { $lt: endDate } },
        { endDate: { $gt: startDate } },
      ],
    });

    if (patientHasOverlappingAppointments) {
      return res
        .status(400)
        .json({ error: "Patient already has appointments during this time" });
    }

    // Create a new appointment instance with the provided data
    const appointment = new Appointment({
      startDate,
      endDate,
      drID,
      pID: patientID, // Set the pID field with patientID
      Description: "Follow Up Appointment",
    });

    // Save the appointment to the database
    const savedAppointment = await appointment.save();

    // Update the patient's doctors array with the new doctor only if not already present
    const isDoctorInArray = patient.doctors.some((doc) =>
      doc.doctorID.equals(drID)
    );
    if (!isDoctorInArray) {
      await Patient.findByIdAndUpdate(patientID, {
        $addToSet: { doctors: { doctorID: drID } },
      });
    }

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





const addHealthRecord = async (req, res) => {
  try {
    const patientID  = req.params.patientID;

    const {data1,data2,data3,data4,data5,data6,doctorID}= req.body;
    console.log(req.body);
    console.log("entered post function addHealthRecord id of patient is :"+patientID)



    // Validate inputs
    if (!patientID) {
      return res.status(400).json({ error: "Missing required  input fields" });
    }

    //retrieve patient from the database
    const patient = await Patient.findById(patientID);

    
    // Save the healthRecord in patient to the database
     patient.healthRecords.push({
      date:data1,
      description:data2,
      labResults:data3,
      medicalInformation:data4,
      primaryDiagnosis:data5,
      treatment:data6,
    })
    await patient.save();


    const patients = await Patient.find({ "doctors.doctorID": doctorID });    
    console.log(doctorID)

    res.status(201).json({
      // message: "Health Record added successfully",
      // healthRecord: healthRecord,
      // patients:
      patients
    });
  } catch (error) {
    console.error("Error adding Health Record:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




const viewWallet = async(req , res)=>{
  const {doctorId} = req.params;
  try{
    const doctor = await Doctor.findById(doctorId);

    if(!doctor){
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (!doctor.wallet) {
      // If the patient doesn't have a wallet attribute, add it with a value of zero
      doctor.wallet = 0;
      await doctor.save();
    }

    
    const walletAmount  = doctor.wallet ;

    res.status(200).json({
      message:" wallet amount is fetched successfully",
      doctor: doctor,
      wallet:walletAmount
    })
  }
  catch(error){
    res.status(500).json({ error: "Internal Server Error" });
  }



}


const acceptContract = async (req, res) => {
  try {
    const { doctorId } = req.params; // Assuming doctorId and contractId are part of the URL parameters

    // Find the doctor by ID in the database
    const doctor = await Doctor.findById(doctorId);

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Find the specific contract for the doctor

    // Check if the contract exists


    // Perform the action to accept the contract, e.g., update the status field
    doctor.contract = 'accepted';

    await doctor.save();

    res.status(200).json({ message: 'Contract accepted successfully', doctor });
  } catch (error) {
    console.error('Error accepting contract', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const getDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params; // Assuming doctorId and contractId are part of the URL parameters

    // Find the doctor by ID in the database
    const doctor = await Doctor.findById(doctorId);

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Find the specific contract for the doctor

    // Check if the contract exists


    // Perform the action to accept the contract, e.g., update the status field

    res.status(200).json({ message: 'Doctor retrieved successfully', doctor });
  } catch (error) {
    console.error('Error Doctor ', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





//pass appointment on check and doctor when opening doctor page and dates by date picker
module.exports = {
  addDoctor,
  getPatients,
  searchPatientByName,
  patientsInUpcomingApointments,
  addPrescription,
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
};
