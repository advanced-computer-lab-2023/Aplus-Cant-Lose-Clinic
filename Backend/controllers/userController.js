const User = require("../Models/user.js");
const Doctor = require("../Models/doctor.js");
const Patient = require("../Models/patient.js");
const Pharmacist = require("../Models/pharmacist.js");
const nodemailer = require("nodemailer");

const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}
const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userfound = await User.findOne({ username: username });
    if (userfound) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const newUser = await User.create({ username, password, role });
    const data = {
      _id: newUser._id, // Use the newly created user's _id
    };
    const token = generateToken(data);

    res.cookie("jwt", token, {
      httpOnly: true, // This prevents JavaScript from accessing the cookie
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in milliseconds
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const data = {
      _id: user._id,
    };

    // If the password is valid, generate a JWT token
    const token = generateToken(data);

    // Fetch additional user data based on the user's role
    let userData = { fUser: user }; // Initialize with the user data

    switch (user.role) {
      case "admin":
        // Handle admin-specific data here if needed
        break;

      case "patient":
        try {
          const pa = await Patient.findOne({ username });
          userData.fUser = pa;
        } catch (err) {
          console.error("Error handling patient:", err);
          return res.status(500).json({ error: "user not found" });
        }
        break;

      case "doctor":
        try {
          const dr = await Doctor.findOne({ username });
          if (dr.status === "pending") throw error;
          userData.fUser = dr;
        } catch (error) {
          console.error("Error handling doctor:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        break;

      default:
        return res.status(500).json({ error: "Unknown role" });
    }

    // Set the JWT as a cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days in milliseconds
    });

    res.status(201).json({
      message: "User logged in successfully",
      role: user.role,
      userData,
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const sendResetEmail = async (req, res) => {
  const { email } = req.body;
  let user; // Declare the user variable

  const u1 = await Patient.findOne({ email });
  const u2 = await Doctor.findOne({ email });
  const u3 = await User.findOne({ email });
  const u4 = await Pharmacist.findOne({ email });

  if (u1) user = u1;
  else if (u2) user = u2;
  else if (u3) user = u3;
  else if (u4) user = u4;

  if (!user) {
    return res.send({ Status: "User not found" });
  }
  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sohailahakeem17@gmail.com",
      pass: "yvxbdrovrmhebgxv",
    },
  });

  var mailOptions = {
    from: "apluscantlose@gmail.com",
    to: email,
    subject: "Reset Password Link",
    text: `http://localhost:3000/reset_password/${user._id}/${token}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.send({ Status: "Error sending email" }); // Handle the error and send a response
    } else {
      return res.send({ Status: "Success" });
    }
  });
};

const getUser = async (req, res) => {
  const username = req.body.username;
  console.log(username);
  try {
    const fUser = await User.findOne({ username: username });
    console.log(fUser);
    // Your switch statement should be within the try block, not outside it.
    switch (fUser.role) {
      case "patient":
        try {
          const pa = await Patient.findByUsername(fUser.username);
          return { user: { fUser, pa } };
        } catch (err) {
          console.error("Error handling patient:", err);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;
      case "doctor":
        try {
          const dr = await Doctor.findByUsername(fUser.username);
          return { user: { fUser, pa } };
        } catch (error) {
          console.error("Error handling doctor:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;
      case "admin":
        try {
          return { fUser };
        } catch (error) {
          console.error("Error handling admin:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
        break;
      default:
        res.status(400).json({ error: "Unknown role" });
    }
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkUser = async (req, res) => {
  const user = await getUser(req.username, res);
  return user.password === req.password
    ? res.status(201).json({ message: "User created successfully", user })
    : res.status(400).json({ error: "Incorrect password" });
};

const updateUser = async (req, res) => {
  // Assuming you have a "userModel" defined somewhere, but it's not clear in your code
  // Also, the parameters for findOneAndUpdate need to be corrected
  userModel.findOneAndUpdate(
    { _id: req.params.donationID },
    req.body, // Update data
    { new: true }, // Return updated document
    (err, user) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(user);
    }
  );
};

const deleteUser = async (req, res) => {
  // Assuming you have a "userModel" defined somewhere, but it's not clear in your code
  userModel.deleteOne({ _id: req.params.donationID }, (err, donation) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "successfully deleted donation" });
  });
};

const logout = (req, res) => {
  // Clear the token cookie
  res.clearCookie("jwt");

  res.status(200).json({ message: "User logged out successfully" });
};
const changePassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // First, validate the token
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.json({ Status: "Error with token" });
      } else {
        // Find the user by ID
        const user = await Patient.findById(id) || await User.findById(id) || await Doctor.findById(id) || await Pharmacist.findById(id);

        if (!user) {
          return res.json({ Status: "User not found" });
        }

        // Find the user by username
        const fuser = await User.findOne({ username: user.username });

        if (!fuser) {
          return res.json({ Status: "User not found" });
        }

        // Hash the new password
        bcrypt.hash(password, 10, async (hashErr, hash) => {
          if (hashErr) {
            return res.json({ Status: hashErr });
          }

          // Update the user's password
          fuser.password = hash;

          // Save the user with the new password
          try {
            await fuser.save();
            return res.json({ Status: "Password changed successfully" });
          } catch (saveErr) {
            return res.json({ Status: saveErr });
          }
        });
      }
    });
  } catch (error) {
    return res.json({ Status: error });
  }
};


module.exports = {
  createUser,
  getUser,
  checkUser,
  updateUser,
  deleteUser,
  login,
  logout,
  sendResetEmail,
  changePassword,
};
