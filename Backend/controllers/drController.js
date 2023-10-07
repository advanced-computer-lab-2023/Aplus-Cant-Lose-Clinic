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





module.exports={addDoctor};