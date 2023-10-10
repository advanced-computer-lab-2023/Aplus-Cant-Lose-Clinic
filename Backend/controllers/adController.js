const User = require("../Models/user");
const Doctor = require("../Models/doctor");
const Patient = require("../Models/patient");
const HPackages = require("../Models/hpackages");
const validator = require('validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}
const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validate input fields
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Check if the username is already in use
    const userFound = await User.findOne({ username });
    if (userFound) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Password strength validation
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Password not strong enough" });
    }

    // Create the admin user record
    const newAdmin = await User.create({ username, password, role: "admin" });

    res.status(201).json({ message: "Admin user created successfully", user: newAdmin });
  } catch (error) {
    console.error("Error creating admin user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const viewPendDr = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "pending" });
    res
      .status(201)
      .json({ message: "pending doctor r got successfully", doctors });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const viewJoinedDr = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "accepted" });
    res
      .status(201)
      .json({ message: "accepted doctor r got successfully", doctors });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewPatients = async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(201).json({ message: "patients r got successfully", patient });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deletePatient = async (req, res) => {
  const patientId = req.params.id; // Assuming the ID is passed as a parameter

  try {
    const patient = await Patient.findByIdAndDelete(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Delete associated appointments
    await Appointment.deleteMany({ pID: patientId });

    // Delete associated prescriptions
    await Prescription.deleteMany({ patientID: patientId });

    // You may also want to delete the associated user
    const user = await User.findOneAndDelete({ username: patient.username });

    res.status(201).json({ message: "Patient deleted successfully", patient });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteDoctor = async (req, res) => {
  const doctorId = req.params.id; // Assuming the ID is passed as a parameter

  try {
    const doctor = await Doctor.findByIdAndDelete(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Delete associated appointments
    await Appointment.deleteMany({ drID: doctorId });

    // Delete associated prescriptions
    await Prescription.deleteMany({ doctorID: doctorId });

    // Remove doctor references from patients
    await Patient.updateMany(
      { "doctors.doctorID": doctorId },
      { $pull: { doctors: { doctorID: doctorId } } }
    );

    // You may also want to delete the associated user
    const user = await User.findOneAndDelete({ username: doctor.username });

    res.status(201).json({ message: "Doctor deleted successfully", doctor });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteAdmin = async (req, res) => {
  const adminId = req.params.id; // Assuming the ID is passed as a parameter

  try {
    const admin = await User.findByIdAndDelete(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.status(201).json({ message: "Admin deleted successfully", admin });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const acceptDoctor = async (req, res) => {
//   try {
//     const Doctor = await Doctor.updateOne({username: req.username },{$set:{status:"accepted"}});
//     res.status(201).json({ message: "Doctor r got accepted", Doctor });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const rejectDoctor = async (req, res) => {
//   try {
//     const Doctor = await Doctor.updateOne({username: req.username },{$set:{status:"rejected"}});

//     res.status(201).json({ message: "Doctor r got accepted", Doctor });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
///HEalth pack

const deletePack = async (req, res) => {
  const packageId = req.params.id; // Assuming the ID is passed as a parameter

  try {
    const package = await HPackages.findByIdAndDelete(packageId);
    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(201).json({ message: "Package deleted successfully", package });
  } catch (error) {
    console.error("Error deleting package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addPack = async (req, res) => {
  const { type, rate, doctorDisc, medicineDisc, familyDisc } = req.body;
  try {
    ///
    const package = await HPackages.create({
      type,
      rate,
      doctorDisc,
      medicineDisc,
      familyDisc,
    });

    res.status(201).json({ message: "package r got successfully", package });
  } catch (error) {
    console.error("Error creating package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePack = async (req, res) => {
  const packageId = req.params.id; // Assuming the package ID is passed as a parameter

  // Define the fields that can be updated
  const allowedFields = ["rate", "doctorDisc", "medicineDisc", "familyDisc"];

  // Extract the fields to update from the request body
  const updates = {};
  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  // Check if at least one field is provided for update
  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: "At least one field must be provided for update" });
  }

  try {
    const package = await HPackages.findByIdAndUpdate(packageId, updates, {
      new: true, // Return the updated document
    });

    if (!package) {
      return res.status(404).json({ error: "Package not found" });
    }

    res.status(200).json({ message: "Package updated successfully", package });
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAdmin,
  viewPendDr,
  viewJoinedDr,
  viewPatients,
  deletePatient,
  deleteDoctor,
  deleteAdmin,
  addPack,
  deletePack,
  updatePack,
  };
