require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");

require("./models/database.js").connectedDatabase();
// logger
const logger = require("morgan");
const allowedOrigins = [
  "http://localhost:5173",
  "https://mycozee.vercel.app",
  "http://localhost:5174",
  "https://mycozee.vercel.app/",
  "https://mycozze.vercel.app",
  "http://mycozee.in",
  "https://mycozee.in",
  "https://mycozee.in/",
  "http://mycozee.in/",
];

// Create an HTTP server for Socket.io
const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // **Join User Room (For One-to-One Messaging)**
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined personal chat room`);
  });

  // **Join Team Room (For Group Messaging)**
  socket.on("joinTeam", (teamId) => {
    socket.join(teamId);
    console.log(`User joined team ${teamId}`);
  });

  // **One-to-One Chat Message**
  socket.on("sendMessage", async ({ senderId, receiverId, message }, callback) => {
    try {
      const chatMessage = await new Chat({
        sender: senderId,
        receiver: receiverId,
        message,
      }).save();

      // Emit message to both sender & receiver
      io.to(receiverId).emit("receiveMessage", chatMessage);
      io.to(senderId).emit("receiveMessage", chatMessage);

      if (callback) callback(chatMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // **Team Group Chat Message**
  socket.on("sendTeamMessage", async ({ senderId, teamId, message }, callback) => {
    try {
      const chatMessage = await new Chat({
        sender: senderId,
        teamId,
        message,
      }).save();

      // Save message reference in the team document
      await Team.findByIdAndUpdate(teamId, { $push: { messages: chatMessage._id } });

      // Emit message to all users in the team
      io.to(teamId).emit("receiveTeamMessage", chatMessage);

      if (callback) callback(chatMessage); // Send back the saved message
    } catch (error) {
      console.error("Error saving team message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


const mongoose = require("mongoose");
const cron = require("node-cron");

cron.schedule("0 0 * * *", async () => {

  const currentDate = new Date();
  try {
    // Find users with expired plans
    const expiredUsers = await User.find({
      planExpiryDate: { $lt: currentDate },
    });

    for (const user of expiredUsers) {
      user.planHistory.push({
        planId: user.currentPlan,
        startDate: user.planStartDate,
        expiryDate: user.planExpiryDate,
      });

      user.currentPlan = null;
      user.planExpiryDate = null;
      user.planPurchaseDate = null;
      await user.save();
    }

    console.log(`Processed ${expiredUsers.length} users with expired plans.`);
  } catch (error) {
    console.error("Error processing expired plans:", error);
  }
});

// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// cookie
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

// cors for connection
const cors = require("cors");
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
// file upload
const fileupload = require("express-fileupload");
app.use(fileupload());
// error
const errorHanler = require("./error/errorHandler.js");
const { generatedErrror } = require("./middlewares/error.js");
const Chat = require("./models/chatModel.js");
const { CatchAsyncErrors } = require("./middlewares/CatchAsyncerror.js");
const User = require("./models/userModel.js");
const Razorpay = require("razorpay");
const Team = require("./models/teamModel.js");
app.use(logger("tiny"));

// routes
app.use("/api/v1/user", require("./routes/indexRoute.js"));
app.use("/api/v1/owner", require("./routes/ownerRoute.js"));
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));
app.use("/api/v1/other", require("./routes/otherRoute.js"));
app.use("/api/v1/sales", require("./routes/salesRoutes.js"));

// error handling
app.all("*", (req, res, next) => {
  next(new errorHanler(`requested url not found ${req.url}`, 404));
});
app.use(generatedErrror);

// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Exporting io for usage in other files if needed
module.exports = { app, io };
