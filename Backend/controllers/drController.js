const Doctor = require("../Models/doctor");
const User = require("../Models/user");
const Patient = require("../Models/patient");
const validator = require('validator');

const addDoctor = async (req, res) => {
  try {
    const { name, email, username, dBirth, gender, rate, affilation, background, docs, password } =
      req.body;

    // Validate input fields
    if (!name || !email || !username || !dBirth || !gender || !rate || !affilation || !background || !docs || !password) {
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

    const emailFoundPatient = await Patient.findOne({ email });
    const emailFoundDoctor = await Doctor.findOne({ email });
    if (emailFoundPatient || emailFoundDoctor) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Password strength validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }

    // Default status is "pending"
    const status = "pending";

    // Create the Doctor and user records
    const doctor = await Doctor.create({
      name,
      email,
      username,
      dBirth,
      gender,
      rate,
      affilation,
      background,
      docs,
      status
    });

    const user = await User.create({
      username,
      password,
      role: "doctor",
    });

    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getPatients = async (req, res) => {
  const { username } = req.query;

  try {
    // Validate the 'username' parameter
    if (!username || username.trim() === "") {
      return res.status(400).json({ error: "Invalid or missing 'username' parameter" });
    }

    // Find patients where the doctor's username exists in the 'doctors' array
    const patients = await Patient.find({ "doctors.username": username });

    return res.status(200).json({ message: "Patients found", patients });
  } catch (error) {
    console.error("Error finding patients:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const searchPatientByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Validate the 'name' parameter
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Invalid or missing 'name' parameter" });
    }

    // Perform the patient search by name (partial match)
    const patients = await Patient.find({ name: { $regex: name, $options: 'i' } });
    
    if (patients.length === 0) {
      return res.status(404).json({ error: "Patient not found" });
    }
    
    // Send a successful response with a 200 status code
    res.status(200).json({ message: "Patients retrieved successfully", patients });
  } catch (error) {
    console.error("Error searching for patients by name:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports={addDoctor, getPatients};