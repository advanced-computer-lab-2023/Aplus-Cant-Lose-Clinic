const Patient = require("../Models/patient");
const User = require("../Models/user");
const Doctor = require("../Models/doctor");
const Pharmacist = require("../Models/pharmacist");
const validator = require('validator');
const addPatient = async (req, res) => {
  try {
    const { name, email, username, dBirth, gender, mobile, emergencyContact, password } = req.body;

    // Validate input fields
    if (!name || !email || !username || !dBirth || !gender || !mobile || !emergencyContact || !password) {
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

    if(!validator.isStrongPassword(password)){
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
  const { username, fullName, NID, age, gender, relation } = req.body;

  try {
    // Validate input fields
    if (!username || !fullName || !NID || !age || !gender || !relation) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the patient exists by username
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Check if the user already has a spouse
    if (relation === "spouse" && patient.family.some((member) => member.relation === "spouse")) {
      return res.status(400).json({ error: "A patient can have only one spouse" });
    }

    if (relation !== "spouse" && relation !== "child") {
      return res.status(400).json({ error: "Invalid relation. Allowed values are 'spouse' or 'child'" });
    }

    // Create the family member object
    const familyMember = { fullName, NID, age, gender, relation };

    // Add the family member to the "family" array
    patient.family.push(familyMember);

    // Save the updated patient document
    await patient.save();

    return res.status(201).json({ message: "Family member added successfully", patient });
  } catch (error) {
    console.error("Error adding family member:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const viewFamilyMembers = async (req, res) => {
  const { username } = req.query;

  try {
    // Find the patient by username
    const patient = await Patient.findOne({ username });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Retrieve the family members of the patient
    const familyMembers = patient.family;

    return res.status(200).json({ message: "Family members retrieved successfully", familyMembers });
  } catch (error) {
    console.error("Error retrieving family members:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
const viewDoctors = async (req, res) => {
  try {
    // Find all doctors
    const doctors = await Doctor.find();

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ error: "No doctors found" });
    }

    // Prepare an array to store doctor information
    const doctorInfo = [];

    // Iterate through each doctor
    for (const doctor of doctors) {
      // Find the health package associated with the patient
      const healthPackage = await HPackages.findById(req.patient.hPackage);

      if (!healthPackage) {
        return res.status(404).json({ error: "Health package not found" });
      }

      // Calculate session price based on doctor's rate, health package, and fee
      const sessionPrice =
        doctor.rate * 1.1 * (1 - healthPackage.doctorDisc / 100);

      // Prepare doctor information object
      const doctorInfoItem = {
        name: doctor.name,
        specialty: doctor.affilation,
        sessionPrice,
      };

      doctorInfo.push(doctorInfoItem);
    }

    return res.status(200).json({ message: "Doctors information", doctors: doctorInfo });
  } catch (error) {
    console.error("Error retrieving doctors information:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const searchDoctorByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate the 'name' parameter
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Invalid or missing 'name' parameter" });
    }

    // Perform the doctor search by name
    const doctors = await Doctor.find({ name: { $regex: name, $options: 'i' } });

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Prepare the response with the found doctors
    return res.status(200).json({ message: "Doctors retrieved successfully", doctors });
  } catch (error) {
    console.error("Error searching for doctor by name:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const searchDoctorBySpecialty = async (req, res) => {
  try {
    const { specialty } = req.query;

    // Validate the 'specialty' parameter
    if (!specialty || specialty.trim() === "") {
      return res.status(400).json({ error: "Invalid or missing 'specialty' parameter" });
    }

    // Perform the doctor search by specialty
    const doctors = await Doctor.find({ affilation: { $regex: specialty, $options: 'i' } });

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ error: "Doctors with the specified specialty not found" });
    }

    // Prepare the response with the found doctors
    return res.status(200).json({ message: "Doctors retrieved successfully", doctors });
  } catch (error) {
    console.error("Error searching for doctor by specialty:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports={addPatient, addFamilyMember, viewFamilyMembers, viewDoctors, searchDoctorByName, searchDoctorBySpecialty};