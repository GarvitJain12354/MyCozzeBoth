const express = require("express");
const {
  user,
  registerUser,
  signin,
  signout,
  userData,
  sendMail,
  changePassword,
  resetPassword,
  UpdateData,
  avatarupload,
  loginUser,
  getAllListings,
  addListing,
  deleteListing,
  updateListing,
  getListingById,
  updateUserProfile,
  sendOtp,
  checkVerificationCode,
  addTenant,
  getUserListing,
  getUserTenant,
  updateTenant,
  deleteTenant,
  getAllNotification,
  seenAllNotifications,
  removeNotifications,
  matchUser,
  assignPlanToUser,
  getListingMatchings,
  reportListing,
  getRequestRefund,
  requestRefund,
  increaseView,
  increaseViewPg,
  getTeamDets,
  verifyOtp,
  sendOtpLogin,
  verifyOtpNumber,
  getSearchListing,
  deleteAccount,
} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");
const { authorizeRoles } = require("../jwt/sendToken");
const https = require("https");
const { default: axios } = require("axios");
const {
  getChatHistory,
  getChatUser,
  deleteChat,
} = require("../controllers/chatController");
const Razorpay = require("razorpay");
const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const router = express.Router();
const accountSid = process.env.TWILO_SID;
const authToken = process.env.TWILO_TOKEN;
const verifySid = process.env.TWILO_VERIFY;
router.get("/", user);
router.get("/garvit", (req, res) => {
  res.json({
    message: "Created by Garvit Jain",
  });
});
// user data
router.get("/user", isAuthenticated, userData);
// login
router.post("/register", registerUser);
// POST signIn
router.post("/signin", loginUser);
// GET SIGNOUT
router.get("/logout", isAuthenticated, signout);
// Send Maio
router.post("/send/mail", sendMail);
// reset password
router.post("/reset/password", isAuthenticated, resetPassword);
// password changed
router.post("/forgetlink/:id", changePassword);
// Upload Avatar
router.post(
  "/upload/avatar",
  isAuthenticated,
  // authorizeRoles("flatemate"),
  avatarupload
);
// Update User Profile
router.post("/update/profile/:id", isAuthenticated, updateUserProfile);
// Get all listings of user
router.get("/all/listings/:city", getAllListings);
// Get all rooms
router.get("/all/rooms/:city");
// Add Listings
router.post(
  "/add/listing",
  isAuthenticated,
  authorizeRoles("flatemate"),
  addListing
);

router.post(
  "/update/listing/:id",
  isAuthenticated,
  authorizeRoles("flatemate"),
  updateListing
);

router.post(
  "/add/tenant",
  isAuthenticated,
  authorizeRoles("flatemate"),
  addTenant
);

router.post(
  "/update/tenant/:id",
  isAuthenticated,
  authorizeRoles("flatemate"),
  updateTenant
);

router.get(
  "/user/listing",
  isAuthenticated,
  authorizeRoles("flatemate"),
  getUserListing
);

router.get(
  "/user/tenant",
  isAuthenticated,
  authorizeRoles("flatemate"),
  getUserTenant
);
// delete listing
router.get(
  "/delete/listing/:id",
  isAuthenticated,
  authorizeRoles("flatemate"),
  deleteListing
);
// delete tenant
router.get(
  "/delete/tenant/:id",
  isAuthenticated,
  authorizeRoles("flatemate"),
  deleteTenant
);
// Edit Listing

router.post(
  "/update/listing/:id",
  isAuthenticated,
  authorizeRoles("flatemate"),
  updateListing
);
router.get("/refund", isAuthenticated, getRequestRefund);
router.get("/all/notification", isAuthenticated, getAllNotification);
router.get("/seen/notification", isAuthenticated, seenAllNotifications);
router.get("/remove/notification/:id", isAuthenticated, removeNotifications);
router.post("/verify-user", (req, res) => {
  const { user_json_url } = req.body;

  if (!user_json_url) {
    return res.status(400).json({ error: "user_json_url is required" });
  }

  // Fetch the user details from the user_json_url
  https
    .get(user_json_url, (response) => {
      let data = "";

      // A chunk of data has been received.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received.
      response.on("end", () => {
        try {
          const jsonData = JSON.parse(data);

          // Access user details
          const user_country_code = jsonData.user_country_code;
          const user_phone_number = jsonData.user_phone_number;
          const user_first_name = jsonData.user_first_name;
          const user_last_name = jsonData.user_last_name;

          console.log("User Country Code:", user_country_code);
          console.log("User Phone Number:", user_phone_number);
          console.log("User First Name:", user_first_name);
          console.log("User Last name:", user_last_name);

          // Optionally, save the user data to your database here

          res.json({
            message: "User data fetched successfully",
            user: jsonData,
          });
        } catch (error) {
          res.status(500).json({ error: "Failed to parse user data" });
        }
      });
    })
    .on("error", (err) => {
      res.status(500).json({ error: err.message });
    });
});
router.post("/reportng/:id", isAuthenticated, reportListing);
router.post("/send-otp", sendOtp);
router.post("/loginotp", sendOtpLogin);
router.post("/verify-otp", verifyOtp);
router.post("/verifyNumber", verifyOtpNumber);
router.get("/get/matches", isAuthenticated, matchUser);
router.get("/get/matches/listing/:id", isAuthenticated, getListingMatchings);
router.get("/chat/:userId/:otherUserId", isAuthenticated, getChatHistory);
router.get("/get/user/chat", isAuthenticated, getChatUser);
router.get("/delete/chat/:id", isAuthenticated, deleteChat);
router.post("/assign/plan", isAuthenticated, assignPlanToUser);
// /create-order endpoint
const razorpay = new Razorpay({
  key_id: "rzp_test_OLYfxYkQUyObgt", // Replace with your Razorpay key_id
  // key_secret: 'YOUR_KEY_SECRET', // Replace with your Razorpay key_secret
});
router.post("/create-order", isAuthenticated, async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const options = {
      amount: Number(amount), // Amount in paise (e.g., 50000 paise = 500 INR)
      currency: currency || "INR",
      receipt: "receipt#1", // You can use a unique receipt ID
    };

    // const order = await razorpay.orders.create(options);
    res.json(options); // Send the order details back to the client
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send("Error creating order");
  }
});
router.post("/save-payment", isAuthenticated, async (req, res) => {
  try {
    const payment = await new Payment(req.body).save();
    const user = await User.findById(req.user.id);
    user.payments.push(payment._id);
    await user.save();
    res.status(201).json({
      message: "Payment saved successfully",
      success: true,
    });
  } catch (error) {}
});
// Refund Request
router.post("/request/refund", isAuthenticated, requestRefund);
router.get("/listing/views/:id", isAuthenticated, increaseView);
router.get("/pg/views/:id", isAuthenticated, increaseViewPg);
router.get("/team/dets", isAuthenticated, getTeamDets);
router.get("/get/location/:type/:location", getSearchListing);
router.get("/delete/account",isAuthenticated,deleteAccount)
module.exports = router;
