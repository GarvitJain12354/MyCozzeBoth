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
  "http://localhost:5175",
  "https://mycozee.vercel.app/",
  "https://mycozze.vercel.app",
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
  // console.log("A user connected");

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
  });

  socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    const chatMessage = await new Chat({
      sender: senderId,
      receiver: receiverId,
      message,
    }).save();
    io.to(receiverId).emit("receiveMessage", chatMessage);
    io.to(senderId).emit("receiveMessage", chatMessage);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
const mongoose = require("mongoose");
const cron = require("node-cron");
// const User = require('./models/User'); // Adjust the path as needed
cron.schedule("0 0 * * *", async () => {
  // console.log("hello");

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
