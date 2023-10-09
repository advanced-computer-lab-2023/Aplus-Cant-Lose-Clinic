const Patient = require("../Models/patient");
const User = require("../Models/user");
const Doctor = require("../Models/doctor");
const Pharmacist = require("../Models/pharmacist");
const Medicine = require("../Models/medicine");
const Appointment = require("../Models/appointments");
const validator = require("validator");
const HPackages = require("../Models/hpackages");

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

    const user = await User.create({
      username,
      password,
      role: "patient",
    });

    res.status(201).json({ message: "Patient created successfully", patient });
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
      return res
        .status(400)
        .json({
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
      }
      else{
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

    // Prepare the response with the found doctors
    return res
      .status(200)
      .json({ message: "Doctors retrieved successfully", doctors });
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
      return res
        .status(400)
        .json({
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

    // Prepare the response with the available doctors
    return res
      .status(200)
      .json({
        message: "Available doctors retrieved successfully",
        availableDoctors,
      });
  } catch (error) {
    console.error("Error searching for available doctors:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const viewPrescriptions = async (req, res) => {
  try {
    const { username } = req.query;

    // Validate the 'username' parameter
    if (!username || username.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid or missing 'username' parameter" });
    }

    // Find the patient by username
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Extract the list of prescription details from the patient's prescriptions array
    let prescriptions = patient.perscriptions;

    if (!prescriptions || prescriptions.length === 0) {
      return res
        .status(404)
        .json({ error: "No prescriptions found for the patient" });
    }

    // Fetch details about each medicine
    const medicineDetails = await Promise.all(
      prescriptions.map(async (prescription) => {
        const medID = prescription.medID;
        const medicine = await Medicine.findById(medID);

        if (!medicine) {
          return null; // Medicine not found for this prescription
        }

        return {
          prescription,
          medicine,
        };
      })
    );

    // Filter out any prescriptions without matching medicines
    const validPrescriptions = medicineDetails.filter((item) => item !== null);

    if (validPrescriptions.length === 0) {
      return res.status(404).json({ error: "No matching prescriptions found" });
    }

    // Prepare the response with the filtered prescriptions and medicine details
    return res
      .status(200)
      .json({
        message: "Prescriptions retrieved successfully",
        prescriptions: validPrescriptions,
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

module.exports = {
  addPatient,
  addFamilyMember,
  viewFamilyMembers,
  viewDoctors,
  searchDoctorsByNameOrSpecialty,
  searchDoctorsBySpecialtyOrAvailability,
  viewPrescriptions,
  patientFilterAppointments
};
