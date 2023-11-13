const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require('cookie-parser');
const stripe=require('stripe')(process.env.STRIPE_PRIVATE_KEY);

// App variables
const app = express(); // Move this line to the top
const port = "8000";
app.use(cors());


app.use(express.json());
app.use(cookieParser());

const MongoURI = process.env.MONGO_URI;

// configurations
// Mongo DB
connectDB()
  .then(() => {
    console.log("MongoDB is now connected!");

    // Starting server
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
// Importing the adRouter
const adRouter = require("./Routes/adRoutes");
app.use("/api/admin", adRouter);
const paRouter = require("./Routes/paRoutes");
app.use("/api/patient", paRouter);
const drRouter = require("./Routes/drRoutes");
app.use("/api/doctor", drRouter);
const { login ,logout,sendResetEmail,changePassword,changePass} = require("./controllers/userController");
app.post("/api/login", login);
app.get("/api/logout", logout);
app.post("/api/sendResetEmail", sendResetEmail);
app.post("/api/changePassword/:id/:token", changePassword);

app.post("/api/changePass/:username", changePass);


// Rest of your code
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// Routing to userController here
