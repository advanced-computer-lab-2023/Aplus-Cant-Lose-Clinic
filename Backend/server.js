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
const port = "10000";
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
  
  })
  .catch((err) => console.log(err));
const server=  app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});

// Routes
// Importing the adRouter
const adRouter = require("./Routes/adRoutes");
app.use("/api/admin", adRouter);
const paRouter = require("./Routes/paRoutes");
app.use("/api/patient", paRouter);
const drRouter = require("./Routes/drRoutes");
app.use("/api/doctor", drRouter);
const { login ,logout,sendResetEmail,changePassword,changePass,allUsers,sendEmail} = require("./controllers/userController");
app.post("/api/login", login);
app.get("/api/logout", logout);
app.post("/api/sendResetEmail", sendResetEmail);
app.post("/api/changePassword/:id/:token", changePassword);

app.get("/api/user/users",allUsers);

app.post("/api/changePass/:username", changePass);

app.post("/api/user/send-email/:userId",sendEmail)


// Rest of your code
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// Routing to userController here

// Basic endpoint for testing
app.get("/home", (req, res) => {
  res.status(200).send("You have everything installed!");
});

// MongoDB connection and starting server

  const chatRoutes = require("./Routes/chatRoutes");
  const messageRoutes = require("./Routes/messageRoutes");

app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);



// --------------------------deployment------------------------------

// Error Handling middlewares


const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(userData);
    socket.join(userData);
    socket.emit("connected");
  });
  socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})
  socket.on("endCall", (data) => {
    io.to(data.to).emit("callEnded");
  });
  

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
