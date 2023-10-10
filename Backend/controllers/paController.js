const Patient = require("../Models/patient");
const User = require("../Models/user");
const Doctor = require("../Models/doctor");
const Pharmacist = require("../Models/pharmacist");
const Medicine = require("../Models/medicine");
const Appointment = require("../Models/appointments");
const validator = require("validator");
const HPackages = require("../Models/hpackages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Prescription = require("../Models/prescription");
function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

const createAppointment = async (req, res) => {
  try {
    const { startDate, endDate, drID, Description } = req.body;
    const pID = req.params.patientID; // Retrieve patient ID from route parameter

    // Validate inputs
    if (!startDate || !endDate || !drID || !Description) {
      return res.status(400).json({ error: "Missing required input fields" });
    }

    // Check if the doctor is already in the patient's doctors set
    const patient = await Patient.findById(pID);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the doctor has any overlapping appointments
    const doctorHasOverlappingAppointments = await Appointment.exists({
      drID: drID,
      $and: [
        { startDate: { $lt: endDate } }, // Check if the new appointment starts before the end of an existing one
        { endDate: { $gt: startDate } }, // Check if the new appointment ends after the start of an existing one
      ],
    });

    if (doctorHasOverlappingAppointments) {
      return res
        .status(400)
        .json({ error: "Doctor already has appointments during this time" });
    }

    // Check if the patient has any overlapping appointments
    const patientHasOverlappingAppointments = await Appointment.exists({
      pID: pID,
      $and: [
        { startDate: { $lt: endDate } }, // Check if the new appointment starts before the end of an existing one
        { endDate: { $gt: startDate } }, // Check if the new appointment ends after the start of an existing one
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
      pID,
      Description,
    });

    // Save the appointment to the database
    const savedAppointment = await appointment.save();

    // Update the patient's doctors array with the new doctor only if not already present
    const isDoctorInArray = patient.doctors.some((doc) =>
      doc.doctorID.equals(drID)
    );
    if (!isDoctorInArray) {
      await Patient.findByIdAndUpdate(pID, {
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

const addPatient = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      dBirth,
      gender,
      mobile,
      emergencyContact,
      password,
    } = req.body;

    // Validate input fields
    if (
      !name ||
      !email ||
      !username ||
      !dBirth ||
      !gender ||
      !mobile ||
      !emergencyContact ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required" });
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

    // Check if the email is already in use
    const emailFound = await Patient.findOne({ email });
    const emailFound2 = await Doctor.findOne({ email });
    const emailFound3 = await Pharmacist.findOne({ email });
    if (emailFound || emailFound2 || emailFound3) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }

    // Calculate age based on date of birth
    const today = new Date();
    const birthDate = new Date(dBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check if the patient is at least 18 years old and not over 150 years old
    if (age < 18 || age > 150) {
      return res.status(400).json({ error: "Patient must be at least 18 and within reasonable age" });
    }

    // Create the patient and user records
    const patient = await Patient.create({
      name,
      email,
      username,
      dBirth,
      gender,
      mobile,
      emergencyContact,
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const data = {
      _id: patient._id,
    };
    const token = generateToken(data);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: "patient",
    });

    res
      .status(201)
      .json({ message: "Patient created successfully", patient, token });
  } catch (error) {
    console.error("Error creating patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addFamilyMember = async (req, res) => {
  const { fullName, NID, age, gender, relation } = req.body;
  const { patientId } = req.params; // Get patientId from URL parameters

  try {
    // Validate input fields
    if (!patientId || !fullName || !NID || !age || !gender || !relation) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the patient exists by ID
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the user already has a spouse
    if (
      relation === "spouse" &&
      patient.family.some((member) => member.relation === "spouse")
    ) {
      return res
        .status(400)
        .json({ error: "A patient can have only one spouse" });
    }

    if (relation !== "spouse" && relation !== "child") {
      return res.status(400).json({
        error: "Invalid relation. Allowed values are 'spouse' or 'child'",
      });
    }

    // Create the family member object
    const familyMember = { fullName, NID, age, gender, relation };

    // Add the family member to the "family" array
    patient.family.push(familyMember);

    // Save the updated patient document
    await patient.save();

    return res
      .status(201)
      .json({ message: "Family member added successfully", patient });
  } catch (error) {
    console.error("Error adding family member:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewFamilyMembers = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find the patient by ID
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Retrieve the family members of the patient
    const familyMembers = patient.family;

    return res.status(200).json({
      message: "Family members retrieved successfully",
      familyMembers,
    });
  } catch (error) {
    console.error("Error retrieving family members:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewDoctors = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Find the patient by patientId
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Find doctors with status "accepted"
    const doctors = await Doctor.find({ status: "accepted" });

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ error: "No accepted doctors found" });
    }

    // Prepare an array to store doctor information
    const doctorInfo = [];

    // Iterate through each accepted doctor
    for (const doctor of doctors) {
      // Find the health package associated with the patient
      const healthPackage = await HPackages.findById(patient.hPackage);

      // Calculate session price based on doctor's rate, health package, and fee
      let sessionPrice = doctor.rate;

      if (healthPackage) {
        sessionPrice *= 1.1 * (1 - healthPackage.doctorDisc / 100);
      } else {
        sessionPrice *= 1.1;
      }

      // Prepare doctor information object
      const doctorInfoItem = {
        name: doctor.name,
        specialty: doctor.affilation,
        sessionPrice,
      };

      doctorInfo.push(doctorInfoItem);
    }

    return res
      .status(200)
      .json({ message: "Accepted doctors information", doctors: doctorInfo });
  } catch (error) {
    console.error("Error retrieving accepted doctors information:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchDoctorsByNameOrSpecialty = async (req, res) => {
  try {
    const { name, specialty } = req.query;

    // Validate that at least one input is provided
    if (!name && (!specialty || specialty.trim() === "")) {
      return res
        .status(400)
        .json({ error: "At least one input (name or specialty) is required" });
    }

    const query = {};

    // Build the query based on provided parameters
    if (name && name.trim() !== "") {
      query.name = { $regex: name, $options: "i" };
    }

    if (specialty && specialty.trim() !== "") {
      query.affilation = { $regex: specialty, $options: "i" };
    }

    // Perform the doctor search with the constructed query
    const doctors = await Doctor.find(query);

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ error: "No matching doctors found" });
    }

    // Prepare the response with the found doctors and consider the patient-specific health package
    const doctorInfo = await Promise.all(
      doctors.map(async (doctor) => {
        const patientId = req.params.patientId;
        const patient = await Patient.findById(patientId);

        if (!patient) {
          return {
            name: doctor.name,
            specialty: doctor.affilation,
            sessionPrice: doctor.rate * 1.1, // Assuming no health package
          };
        }

        const healthPackage = await HPackages.findById(patient.hPackage);

        return {
          name: doctor.name,
          specialty: doctor.affilation,
          sessionPrice:
            doctor.rate * 1.1 * (1 - (healthPackage?.doctorDisc || 0) / 100),
        };
      })
    );

    return res
      .status(200)
      .json({ message: "Doctors retrieved successfully", doctors: doctorInfo });
  } catch (error) {
    console.error("Error searching for doctors:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchDoctorsBySpecialtyOrAvailability = async (req, res) => {
  try {
    const { searchTime, specialty } = req.query;

    // Check if neither 'searchTime' nor 'specialty' is provided
    if (!searchTime && (!specialty || specialty.trim() === "")) {
      return res.status(400).json({
        error: "At least one input (searchTime or specialty) is required",
      });
    }

    // Convert 'searchTime' to a Date object if provided
    const searchDateTime = searchTime ? new Date(searchTime) : null;

    // Find appointments that overlap with the specified time if 'searchTime' is provided
    const overlappingAppointments = searchDateTime
      ? await Appointment.find({
          startDate: { $lt: searchDateTime },
          endDate: { $gt: searchDateTime },
        })
      : [];

    // Get the list of doctor IDs from the overlapping appointments
    const doctorIds = overlappingAppointments.map(
      (appointment) => appointment.drID
    );

    // Build the query to find available doctors based on specialty and/or availability
    const query = {};
    if (searchDateTime) {
      query._id = { $nin: doctorIds };
    }
    if (specialty && specialty.trim() !== "") {
      query.affilation = { $regex: specialty, $options: "i" };
    }

    // Find available doctors who match the specified criteria
    const availableDoctors = await Doctor.find(query);

    if (!availableDoctors || availableDoctors.length === 0) {
      return res
        .status(404)
        .json({ error: "No available doctors found matching the criteria" });
    }

    // Prepare the response with the available doctors and consider the patient-specific health package
    const doctorInfo = await Promise.all(
      availableDoctors.map(async (doctor) => {
        const patientId = req.params.patientId;
        const patient = await Patient.findById(patientId);

        if (!patient) {
          return {
            name: doctor.name,
            specialty: doctor.affilation,
            sessionPrice: doctor.rate * 1.1, // Assuming no health package
          };
        }

        const healthPackage = await HPackages.findById(patient.hPackage);

        return {
          name: doctor.name,
          specialty: doctor.affilation,
          sessionPrice:
            doctor.rate * 1.1 * (1 - (healthPackage?.doctorDisc || 0) / 100),
        };
      })
    );

    return res.status(200).json({
      message: "Available doctors retrieved successfully",
      doctors: doctorInfo,
    });
  } catch (error) {
    console.error("Error searching for available doctors:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewPrescriptions = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Validate the 'patientId' parameter
    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    // Find the patient by patientId
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Fetch details about each prescription, including medicine and doctor
    const prescriptions = await Prescription.find({ patientID: patient._id }).populate("medID doctorID");

    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ error: "No prescriptions found for the patient" });
    }

    // Prepare the response with the prescriptions, medicine, and doctor details
    return res.status(200).json({
      message: "Prescriptions retrieved successfully",
      prescriptions,
    });
  } catch (error) {
    console.error("Error retrieving prescriptions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const patientFilterAppointments = async (req, res) => {
  const { patientId, startDate, endDate, status } = req.query;

  // Check if at least one filter parameter is provided
  if (!patientId && !startDate && !endDate && !status) {
    return res
      .status(400)
      .json({ error: "At least one filter parameter is required" });
  }

  // Build the query object based on the provided parameters
  const query = {
    pID: patientId,
  };

  if (startDate) {
    query.startDate = { $gte: new Date(startDate) };
  }

  if (endDate) {
    query.endDate = { $lte: new Date(endDate) };
  }

  if (status) {
    query.Description = status;
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



const  filterPrescriptions = async (req, res) => {
  try {
    const { date, doctorNameInput, doctorSpecialtyInput, status } = req.query;
    const patientId = req.params.patientId; // Retrieve patient ID from route parameter

    if (!patientId) {
      return res.status(400).json({ error: "Patient ID is required" });
    }

    // Check if no filters are provided
    if (!date && !doctorNameInput && !doctorSpecialtyInput && !status) {
      return res
        .status(400)
        .json({ error: "At least one filter input is required" });
    }

    // Build the query based on the provided filters
    const query = {
      patientID: patientId, // Use patientID instead of _id
    };

    if (date) {
      query.datePrescribed = date;
    }

    if (status) {
      query.status = status;
    }

    // Find prescriptions based on the query
    const prescriptions = await Prescription.find(query).populate("medID doctorID");

    if (!prescriptions || prescriptions.length === 0) {
      return res.status(404).json({ error: "No prescriptions found" });
    }

    // Filter prescriptions based on the provided criteria
    const filteredPrescriptions = prescriptions.filter((prescription) => {
      let match = true;

      // Check doctor name if doctorNameInput is provided
      if (doctorNameInput) {
        const doctorName = prescription.doctorID.name.toLowerCase();
        const input = doctorNameInput.toLowerCase();

        if (!doctorName.includes(input)) {
          match = false;
        }
      }

      // Check doctor specialty if doctorSpecialtyInput is provided
      if (doctorSpecialtyInput) {
        const doctorSpecialty = prescription.doctorID.specialty.toLowerCase();
        const input = doctorSpecialtyInput.toLowerCase();

        if (!doctorSpecialty.includes(input)) {
          match = false;
        }
      }

      return match;
    });

    res.status(200).json({
      message: "Prescriptions filtered successfully",
      prescriptions: filteredPrescriptions,
    });
  } catch (error) {
    console.error("Error filtering prescriptions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports = {
  addPatient,
  addFamilyMember,
  viewFamilyMembers,
  viewDoctors,
  searchDoctorsByNameOrSpecialty,
  searchDoctorsBySpecialtyOrAvailability,
  viewPrescriptions,
  patientFilterAppointments,
  createAppointment,
  filterPrescriptions,
};
