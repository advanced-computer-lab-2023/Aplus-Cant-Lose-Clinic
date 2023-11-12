const User = require("../Models/user");
const Doctor = require("../Models/doctor");
const Patient = require("../Models/patient");
const Appointment=require("../Models/appointments");
const Prescription = require("../Models/prescription")
const HPackages = require("../Models/hpackages");
const validator = require('validator');
const bcrypt = require("bcrypt");
const path = require('path');

const jwt = require("jsonwebtoken");
const Medicine = require("../Models/medicine");
const nodemailer = require('nodemailer');
// Replace 'path-to-doctor-model' with the actual path to your Doctor model

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
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    // Create the admin user record
    const newAdmin = await User.create({ username, password: hashedPassword, role: "admin" });
    const data = {
      _id: newAdmin._id,
    };
    const token = generateToken(data);



    res.status(201).json({ message: "Admin user created successfully", user: newAdmin });
  } catch (error) {
    console.error("Error creating admin user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const viewPendDr = async (req, res) => {
  try {
    const pendDoctors = await Doctor.find({ status: "pending" });
    res
      .status(201)
      .json({ message: "pending doctor r got successfully", pendDoctors});
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const viewJoinedDr = async (req, res) => {
  try {
    // Find doctors with status "accepted" and those with an accepted contract
    const joinDoctors = await Doctor.find({
      $or: [
        { status: "accepted" },
        { "contract.accepted": { $exists: true, $eq: true } }, // Include doctors with an existing and accepted contract
      ],
    });

    res.status(201).json({ message: "Accepted doctors retrieved successfully", joinDoctors });
  } catch (error) {
    console.error("Error retrieving accepted doctors:", error);
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

const viewMedicine = async (req, res) => {
  try {
    const medicines= await Medicine.find();
    res.status(201).json({ message: "medicinesss r got successfully", medicines});
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
  const allowedFields = ["type", "rate", "doctorDisc", "medicineDisc", "familyDisc"];

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

const viewHealthP = async (req, res) => {
  try {
    const HealthPack = await HPackages.find();
    res.status(201).json({ message: "health pack got successfully", HealthPack });
  } catch (error) {
    console.error("Error creating health pack:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const viewAdmin = async(req, res) => {
  try{
    const AdminView = await User.find({role:'admin'});
    res.status(201).json({ message: "Admin got successfully", AdminView });
  }catch(error){
    console.error("error creating user",error);
    res.status(500).json({error:"internal server error"});
  }
}
const sendAcceptEmail = async (req, res) => {
  const { id } = req.body;

  try {
    // Find the doctor by ID
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).send({ Status: "Doctor not found" });
    }

    // Update the doctor's status to "accepted"
    doctor.status = "accepted";

    // Assuming you have the file path of the contract image
    const contractImagePath = 'contract.png';  // Replace with the actual path

    // Update the doctor's contract attribute with the image path
    doctor.contract = {
      file: contractImagePath,
      accepted: false,
    };

    // Save the changes to the doctor
    await doctor.save();

    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sohailahakeem17@gmail.com",
        pass: "yvxbdrovrmhebgxv",
      },
    });

    // Define email options
    const mailOptions = {
      from: "sohailahakeem17@gmail.com",
      to: doctor.email, // Assuming the doctor has an 'email' field, adjust as needed
      subject: "Acceptance Confirmation",
      text: `Congratulations! You have been accepted to join El7a2ni Clinic as a Doctor.`,
      attachments: [
        {
          filename: 'contract.png', // Change the filename as needed
          path: contractImagePath,
          cid: 'unique@cid', // use unique cid for image embedding
        },
      ],
      html: `
        <p>Congratulations! You have been accepted to join El7a2ni Clinic as a Doctor.</p>
        <p><img src="cid:unique@cid" alt="Contract Image"/></p>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ Status: "Error sending email" });
      } else {
        return res.status(200).send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: "Server Error" });
  }
};

const sendRejectEmail = async (req, res) => {
  const { id } = req.body;

  try {
    // Find the user by ID
    const user = await Doctor.findById(id);

    if (!user) {
      return res.status(404).send({ Status: "User not found" });
    }

    // Update the user's status to "accepted"
    user.status = "rejected";
    await user.save();

    // Create a transporter for sending email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sohailahakeem17@gmail.com",
        pass: "yvxbdrovrmhebgxv",
      },
    });

    // Define email options
    const mailOptions = {
      from:"sohailahakeem17@gmail.com",
      to: user.email, // Assuming the user has an 'email' field, adjust as needed
      subject: "Acceptance Confirmation",
      text: `Unfortunately! You did not get accepted  to join El7a2ni Clinic as a Doctor.`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).send({ Status: "Error sending email" });
      } else {
        return res.status(200).send({ Status: "Success" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ Status: "Server Error" });
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
  viewMedicine,
  updatePack,
  viewHealthP,
  viewAdmin,
  sendAcceptEmail,
  sendRejectEmail
};
