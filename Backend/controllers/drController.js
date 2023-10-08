const Doctor = require("../Models/doctor");
const User = require("../Models/user");
const Patient = require("../Models/patient");
const validator = require("validator");
const Appointment = require("../Models/appointment");

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      dBirth,
      gender,
      rate,
      affilation,
      background,
      docs,
      password,
    } = req.body;

    // Validate input fields
    if (
      !name ||
      !email ||
      !username ||
      !dBirth ||
      !gender ||
      !rate ||
      !affilation ||
      !background ||
      !docs ||
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
      status,
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
      return res
        .status(400)
        .json({ error: "Invalid or missing 'username' parameter" });
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
      return res
        .status(404)
        .json({
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
const filterPrescriptions = async (patientId, filters) => {
  if (!patientId) {
    return { error: "Patient ID is required" };
  }

  const {
    date, // The date to filter by (optional)
    doctorID, // The doctor's ID to filter by (optional)
    status, // The status to filter by (optional)
  } = filters;

  // Check if no filters are provided
  if (!date && !doctorID && !status) {
    return { error: "At least one filter input is required" };
  }

  // Build the query based on the provided filters
  const query = {
    _id: patientId,
  };

  if (date) {
    query["perscriptions.datePrescribed"] = date;
  }

  if (doctorID) {
    query["perscriptions.doctorID"] = doctorID;
  }

  if (status) {
    query["perscriptions.status"] = status;
  }

  try {
    // Find the patient document based on the patient ID and apply the filters
    const patient = await Patient.findOne(query).populate({
      path: "perscriptions.medID perscriptions.doctorID",
    });

    if (!patient) {
      return { error: "Patient not found" };
    }

    // Filter prescriptions based on the provided criteria
    const filteredPrescriptions = patient.perscriptions.filter(
      (prescription) => {
        let match = true;
        if (
          date &&
          prescription.datePrescribed.toDateString() !==
            new Date(date).toDateString()
        ) {
          match = false;
        }
        if (doctorID && prescription.doctorID.id !== doctorID) {
          match = false;
        }
        if (status && prescription.status !== status) {
          match = false;
        }
        return match;
      }
    );

    return {
      message: "Prescriptions filtered successfully",
      prescriptions: filteredPrescriptions,
    };
  } catch (error) {
    console.error("Error filtering prescriptions:", error);
    return { error: "Internal Server Error" };
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
    const emailExists = await Doctor.findOne({ email }) || await Patient.findOne({ email }) || await Pharmacist.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Find the doctor by ID and update the specified fields
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { email, rate, affiliation },
      { new: true } // Return the updated document
    );

    if (!updatedDoctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const doctorFilterAppointments = async (req, res) => {
  const { doctorId, startDate, endDate, status } = req.query;

  // Check if at least one filter parameter is provided
  if (!doctorId && !startDate && !endDate && !status) {
    return res.status(400).json({ error: "At least one filter parameter is required" });
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
    query.Description = status;
  }

  try {
    // Find appointments that match the query
    const appointments = await Appointment.find(query);

    res.status(200).json({ message: "Appointments filtered successfully", appointments });
  } catch (error) {
    console.error("Error filtering appointments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addDoctor,
  getPatients,
  searchPatientByName,
  patientsInUpcomingApointments,
  filterPrescriptions,
  editDoctor,
  doctorFilterAppointments
};
