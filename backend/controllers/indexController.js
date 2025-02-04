const errorHanler = require("../error/errorHandler");
const { sendToken } = require("../jwt/sendToken");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");

const User = require("../models/userModel.js");

const { sendmail } = require("../nodemailer/nodemailer");
const imagekit = require("../middlewares/imagekit").initimagekit();
const path = require("path");
// const accountSid = process.env.TWILO_SID;
// const authToken = process.env.TWILO_TOKEN;
// const verifySid = process.env.TWILO_VERIFY;
// const client = require('twilio')(accountSid, authToken);

const Owner = require("../models/ownerModel.js");
const Listing = require("../models/listingModel.js");
const Tenant = require("../models/tenantModel.js");
const Notification = require("../models/notificationModel.js");
const Plan = require("../models/planModel.js");
const Room = require("../models/roomModel.js");

exports.user = CatchAsyncErrors(async (req, res, next) => {
  const userData = await User.find().exec();

  res.json({ message: "This is user Data", userData });
});
exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
  try {
    const userModel = await new User(req.body).save();
    userModel.contact = Number(req.body.contact);
    const file = req?.files?.avatar;
    // console.log(file.name);
    // console.log(userData);
    if (req.body.image) {
      userModel.avatar = { url: req.body.image };
      await userModel.save();
    }
    if (file) {
      const modifiedFileName = `demoImage-${Date.now()}${path.extname(
        file.name
      )}`;
      const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
      });
      userModel.avatar = { fileId, url };
      userModel.prefrence = JSON.parse(req.body.prefrence);
      await userModel.save();
    }

    sendToken(userModel, 200, res);
  } catch (error) {
    console.log(error);

    res.json(error);
  }
});
exports.userData = CatchAsyncErrors(async (req, res, next) => {
  const userModel = await User.findById(req.user._id)
    .populate("currentPlan")
    .exec();
  const currentDate = new Date();

  const { io } = require("../app.js");
  try {
    const expiredUsers = await User.find({
      planExpiryDate: { $lt: currentDate },
    });
    console.log(expiredUsers);

    for (const user of expiredUsers) {
      user.planHistory.push({
        planId: user.currentPlan,
        startDate: user.planPurchaseDate,
        expiryDate: user.planExpiryDate,
        paymentId: user.currentPaymentId,
        refundStatus: "Request",
      });

      user.currentPlan = null;
      user.planExpiryDate = null;
      user.planPurchaseDate = null;
      user.currentPaymentId = null;
      await user.save();
    }
    if (expiredUsers) {
      const dets = {
        title: "Your Plan is expired",
        description: "Plan is expired to renew it go to plans .",
      };

      const noti = await new Notification(dets).save();

      expiredUsers.notification.push(noti._id);
      const send = {
        title: "Your Plan is expired",
        description: "Plan is expired to renew it go to plans .",
        id: expiredUsers._id,
      };
      io.emit("userconnect", send);
      await expiredUsers.save();
    }
    // console.log(`Processed ${expiredUsers.length} users with expired plans.`);
  } catch (error) {
    // console.error("Error processing expired plans:", error);
  }
  res.json({
    user: userModel,
    authenticated: true,
  });
});
exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
  const userModel = await User.findOne({ email: req.body.email })
    .select("+password")
    .exec();
  if (!userModel) return next(new errorHanler("User not found", 500));
  const isMatch = userModel.comparepassword(req.body.password);

  if (!isMatch) return next(new errorHanler("Wrong password", 500));
  if (userModel.role === "admin" && !userModel.isVerified)
    return next(new errorHanler("Not a verified User", 500));
  // if (userModel.role !== "flatemate")
  //   return next(new errorHanler("Wrong Tenant Credentials", 500));
  sendToken(userModel, 201, res);
});
exports.signout = CatchAsyncErrors(async (req, res, next) => {
  res
    .cookie("token", "", {
      expires: new Date(Date.now()), // Immediate expiration
      httpOnly: true,
      // secure: true, // Uncomment if using HTTPS
      sameSite: "None", // Adjust this as per your requirement
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
});
exports.sendMail = CatchAsyncErrors(async (req, res, next) => {
  try {
    const userData = await User.findOne({ email: req.body.email }).exec();
    if (!userData) {
      return next(new errorHanler("User with this email does not exist ", 404));
    }
    const url = `http://localhost:5001/user/forgetlink/${userData._id}`;
    userData.resetpasswordToken = "1";
    userData.save();

    sendmail(req, res, next, url);
  } catch (error) {
    console.log(error);
    res.json({
      error,
    });
  }
  // res.json({ url });
});
exports.changePassword = CatchAsyncErrors(async (req, res, next) => {
  const userData = await User.findById({ _id: req.params.id }).exec();

  if (!userData) {
    next(new errorHanler("User not exist"), 500);
  }

  if (userData.resetpasswordToken === "1") {
    userData.password = req.body.password;
    userData.resetpasswordToken = "0";
    userData.save();

    res.status(200).json({
      message: "Password Change Succesfully",
    });
  } else {
    res.status(400).json({
      message: "Link Expired",
    });
  }
});
exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  const userData = await User.findById(req.user.id).select("+password");
  const isMatch = userData.comparepassword(req.body.oldpassword);
  if (!isMatch)
    return next(new errorHanler("Please enter correct old password", 500));
  if (isMatch) {
    userData.password = req.body.newpassword;
    await userData.save();
    sendToken(userData, 201, res);
  }
  res.status(200).json({ message: "Password is changed succesfully" });
});
exports.UpdateData = CatchAsyncErrors(async (req, res, next) => {
  // console.log("hello");
  const userData = await User.findByIdAndUpdate(req.id, req.body).exec();

  res.status(200).json({ message: "user updated successfully" });
});
exports.avatarupload = CatchAsyncErrors(async (req, res, next) => {
  // console.log(req.user.id);
  try {
    const userData = await User.findById(req.user._id).exec();

    const file = req.files.avatar;

    const modifiedFileName = `demoImage-${Date.now()}${path.extname(
      file.name
    )}`;

    if (
      userData.avatar?.fileId !== "" &&
      userData.avatar.fileId !== undefined
    ) {
      await imagekit.deleteFile(userData?.avatar?.fileId);
    }
    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiedFileName,
    });
    console.log(fileId, url, 456);

    userData.avatar = { fileId, url };
    await userData.save();
    res.json({ message: "Profile Image uploaded" });
  } catch (error) {
    console.log(error);

    res.json({
      error,
    });
  }
});
exports.updateUserProfile = CatchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      user,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      error,
    });
  }
});
exports.getAllListings = CatchAsyncErrors(async (req, res, next) => {
  try {
    const listings = await Listing.find({
      city: req.params.city,
    });
    res.send(200).json({
      listings,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.addListing = CatchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user?.currentPlan && user.listing.length === 1) {
      res.status(400).json({
        message: "Buy a premium plan to add more listings",
      });
    }
    const highlights = JSON.parse(req.body.highlights); // Parse highlights
    const amenities = JSON.parse(req.body.amenities); // Parse highlights
    const dets = {
      highlights,
      location: req.body.location,
      approxRent: req.body.approxRent,
      gender: req.body.gender,
      occupancy: req.body.occupancy,
      public: req.body.public === "true",
      amenities,
      description: req.body.description,
      city: req.body.city,
    };

    // console.log(dets);
    const listing = await new Listing(dets).save();
    console.log(listing);

    const file = req.files.images;
    if (file && file.length > 0) {
      const singleimg = await Promise.all(
        file.map(async (i) => {
          const modifiedFileName = `roomImage-${Date.now()}${path.extname(
            i.name
          )}`;
          const { fileId, url } = await imagekit.upload({
            file: i.data,
            fileName: modifiedFileName,
          });
          return { fileId, url };
        })
      );

      listing.images.push(...singleimg);
    }

    user.listing.push(listing._id);
    await user.save();
    listing.user = user._id;
    await listing.save();
    res.status(201).json({
      message: "Listing added succesfully",
      data: listing,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error,
    });
  }
});

exports.addTenant = CatchAsyncErrors(async (req, res, next) => {
  try {
    const highlights = JSON.parse(req.body.highlights);
    const dets = {
      highlights,
      location: req.body.location,
      approxRent: req.body.approxRent,
      gender: req.body.gender,
      occupancy: req.body.occupancy,
      public: req.body.public === "true",
      isPg: req.body.isPg === "true",
      isTeam: req.body.isTeam === "true",
      description: req.body.description,
      city: req.body.city,
    };
    const tenant = await new Tenant(dets);
    const user = await User.findById(req.user.id);

    user.tenant = tenant._id;
    await user.save();
    tenant.user = user._id;
    await tenant.save();
    res.status(201).json({
      message: "Tenant Requirements added succesfully",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error,
    });
  }
});
exports.updateTenant = CatchAsyncErrors(async (req, res, next) => {
  try {
    const highlights = JSON.parse(req.body.highlights);
    const dets = {
      highlights,
      location: req.body.location,
      approxRent: req.body.approxRent,
      gender: req.body.gender,
      occupancy: req.body.occupancy,
      public: req.body.public === "true",
      isPg: req.body.isPg === "true",
      isTeam: req.body.isTeam === "true",
      description: req.body.description,
    };
    const tenant = await Tenant.findByIdAndUpdate(req.params.id, dets);
    const user = await User.findById(req.user.id);

    user.tenant = tenant._id;
    await user.save();
    tenant.user = user._id;
    await tenant.save();
    const t = await Tenant.findById(req.params.id);
    res.status(201).json({
      message: "Tenant Requirements updated succesfully",
      data: t,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      error,
    });
  }
});
exports.getUserListing = CatchAsyncErrors(async (req, res, next) => {
  try {
    const listing = await User.findById(req.user.id).populate({
      path: "listing",
      populate: {
        path: "user", // Assuming user field is referenced in Listing schema
        select: "firstname lastname email avatar -_id", // Adjust fields as necessary
      },
    });
    res.status(200).json({
      data: listing?.listing,
    });
  } catch (error) {
    res.error({
      error,
    });
  }
});
exports.getUserTenant = CatchAsyncErrors(async (req, res, next) => {
  try {
    const listing = await User.findById(req.user.id).populate({
      path: "tenant",
      populate: {
        path: "user",
        select: "firstname lastname email avatar -_id",
      },
    });
    res.status(200).json({
      data: listing?.tenant,
    });
  } catch (error) {
    res.error({
      error,
    });
  }
});
exports.deleteListing = CatchAsyncErrors(async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const user = await User.findById(req.user.id).exec();
    try {
      listing.images.forEach(async (i) => {
        await imagekit.deleteFile(i.fileId);
      });
    } catch (error) {
      console.log(error, "image");
    }

    const list = await Listing.findByIdAndDelete(req.params.id);
    console.log(list);
    const filterList = user.listing.filter(
      (i) => i._id.toString() !== listing._id.toString()
    );
    user.listing = filterList;
    await user.save();
    res.status(200).json({
      message: "Listing Deleted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.json({
      error,
    });
  }
});
exports.deleteTenant = CatchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.user._id);

    const user = await User.findById(req.user._id);

    // Delete the tenant
    const list = await Tenant.findByIdAndDelete(req.params.id);
    // console.log(list);

    user.tenant = null;
    await user.save();

    res.status(200).json({
      message: "Deleted Successfully",
      success: true,
    });
  } catch (error) {
    // console.log(error);

    res.status(500).json({
      error,
    });
  }
});

exports.updateListing = CatchAsyncErrors(async (req, res, next) => {
  try {
    var oldImage = JSON.parse(req.body.oldImage);
    const l = await Listing.findById(req.params.id);

    var imagesToRemove = l.images.filter(
      (img) => !oldImage.some((oldImg) => oldImg.fileId === img.fileId)
    );

    // Remove old images from ImageKit
    imagesToRemove.forEach(async (i) => {
      try {
        await imagekit.deleteFile(i.fileId);
      } catch (err) {
        console.error(`Failed to delete image with fileId ${i.fileId}:`, err);
      }
    });

    // Update existing listing images
    l.images = oldImage;
    await l.save();

    // Update other listing details
    const highlights = JSON.parse(req.body.highlights);
    const amenities = JSON.parse(req.body.amenities);
    const dets = {
      highlights,
      location: req.body.location,
      city: req.body.city,
      approxRent: req.body.approxRent,
      gender: req.body.gender,
      occupancy: req.body.occupancy,
      public: req.body.public === "true",
      amenities,
      description: req.body.description,
    };
    const listing = await Listing.findByIdAndUpdate(req.params.id, dets);

    // Handle file upload for new images
    const files = req.files && req.files.images;

    // If files are present
    if (files) {
      const fileArray = Array.isArray(files) ? files : [files]; // Handle both single file and array

      const newImages = await Promise.all(
        fileArray.map(async (i) => {
          const modifiedFileName = `roomImage-${Date.now()}${path.extname(
            i.name
          )}`;
          const { fileId, url } = await imagekit.upload({
            file: i.data,
            fileName: modifiedFileName,
          });
          return { fileId, url };
        })
      );

      // Add new images to the listing
      l.images.push(...newImages);
    }

    // Save updated listing with new images
    await l.save();

    res.status(200).json({
      message: "Listing details updated successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while updating the listing.",
    });
  }
});

const accountSid = "AC7931138dace41d49b35833bebb37f521";
const authToken = "43b9fb9c4885af9460e0c2b4bfb69a76";
const client = require("twilio")(accountSid, authToken);
const verifySid = "VA4e194fb8cae0070e9e9a679383159c79"; // Make sure to set your verify SID

// Function to check the verification code
exports.checkVerificationCode = async (req, res) => {
  const { number, code } = req.body; // Assuming code is also passed in the body

  try {
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: `+91${number}`, code });
    res.status(200).json({ status: verificationCheck.status });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Verification failed" });
  }
};

// Function to send OTP
// exports.sendOtp = CatchAsyncErrors(async (req, res, next) => {
//   try {
//     const { number } = req.body;
//     // console.log(number);

//     const verification = await client.verify.v2
//       .services(verifySid)
//       .verifications.create({ to: `+91${number}`, channel: "sms" });

//     // console.log(verification.status);
//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(400)
//       .json({ error: "Wrong Number. Please enter a valid number." });
//   }
// });
// const axios = require("axios");

const axios = require("axios");
const { log } = require("console");

// In-memory storage for OTPs (use Redis or a database in production)

const otpStore = new Map();

// Generate a unique OTP (for demonstration purposes)
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);
exports.sendOtpLogin = async (req, res) => {
  const { number } = req.body;
  const user = await User.findOne({contact:number})
  if(!user) return res.status(404).json({
    message:"User not found with this number"
  })
  const indianNumberPattern = /^[6-9]\d{9}$/;

  if (!indianNumberPattern.test(number)) {
    return res.status(400).json({
      error: "Invalid Indian mobile number. Please enter a valid number.",
    });
  }
  try {
    // Generate unique OTP
    const otp = generateOtp();

    // Store OTP with expiry (5 minutes)
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(number, { otp, expiresAt });
    console.log(`Stored OTP for ${number}:`, otpStore.get(number));

    // Send OTP using AuthKey API
    console.log(`Generated OTP: ${otp}`);

    const response = await axios.get(
      `https://api.authkey.io/request?authkey=32cbe7e2ba2f16a9&mobile=${number}&country_code=91&sid=16109&company=MyCozee&otp=${otp}`
    );

    // Check if OTP submission was successful
    if (response.data.Message !== "Submitted Successfully") {
      return res.status(400).json({
        error: "Failed to send OTP. Please try again.",
        details: response.data,
      });
    }

    res.status(200).json({
      message: "OTP sent successfully",
      data: { LogID: response.data.LogID },
    });
  } catch (error) {
    console.error("Error while sending OTP:", error.message);
    res.status(500).json({
      error: "Failed to send OTP",
      details: error.message,
    });
  }
};
// Send OTP
exports.sendOtp = async (req, res) => {
  const { number } = req.body;
  const indianNumberPattern = /^[6-9]\d{9}$/;

  if (!indianNumberPattern.test(number)) {
    return res.status(400).json({
      error: "Invalid Indian mobile number. Please enter a valid number.",
    });
  }
  try {
    const user = await User.findOne({ contact: number });
    if (user) {
      return res
        .status(400)
        .json({ error: "User already exists with this number" });
    }
    // Generate unique OTP
    const otp = generateOtp();

    // Store OTP with expiry (5 minutes)
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(number, { otp, expiresAt });
    console.log(`Stored OTP for ${number}:`, otpStore.get(number));

    // Send OTP using AuthKey API
    console.log(`Generated OTP: ${otp}`);

    const response = await axios.get(
      `https://api.authkey.io/request?authkey=32cbe7e2ba2f16a9&mobile=${number}&country_code=91&sid=16109&company=MyCozee&otp=${otp}`
    );

    // Check if OTP submission was successful
    if (response.data.Message !== "Submitted Successfully") {
      return res.status(400).json({
        error: "Failed to send OTP. Please try again.",
        details: response.data,
      });
    }

    res.status(200).json({
      message: "OTP sent successfully",
      data: { LogID: response.data.LogID },
    });
  } catch (error) {
    console.error("Error while sending OTP:", error.message);
    res.status(500).json({
      error: "Failed to send OTP",
      details: error.message,
    });
  }
};

// Verify OTP
exports.verifyOtp = (req, res) => {
  const { number, code } = req.body;
  const otp = parseInt(code, 10);

  // Retrieve the OTP from the store
  const storedOtp = otpStore.get(number);
  console.log(`Stored OTP for ${number}:`, storedOtp);

  if (!storedOtp) {
    return res.status(400).json({
      error: "OTP expired or not found. Please request a new one.",
    });
  }

  // Check if OTP is valid and not expired
  if (storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
    return res.status(400).json({
      error: "Invalid or expired OTP. Please try again.",
    });
  }

  // OTP is valid - proceed with success
  otpStore.delete(number); // Remove OTP after successful verification

  res.status(200).json({
    message: "OTP verified successfully",
  });
};

// Verify OTP NUMBER
exports.verifyOtpNumber = CatchAsyncErrors(async (req, res) => {
  const { number, code } = req.body;
  const otp = parseInt(code, 10);

  // Retrieve the OTP from the store
  const storedOtp = otpStore.get(number);
  console.log(`Stored OTP for ${number}:`, storedOtp);

  if (!storedOtp) {
    return res.status(400).json({
      error: "OTP expired or not found. Please request a new one.",
    });
  }

  // Check if OTP is valid and not expired
  if (storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
    return res.status(400).json({
      error: "Invalid or expired OTP. Please try again.",
    });
  }

  // OTP is valid - proceed with success
  // otpStore.delete(number); // Remove OTP after successful verification
  const user = await User.findOne({ contact: number });

  if (!user) {
    return res.status(400).json({
      error: "User not found",
    });
  }
  sendToken(user, 200, res);

  // res.status(200).json({
  //   message: "OTP verified successfully",
  // });
});
// exports.sendOtp = CatchAsyncErrors(async (req, res, next) => {
//   try {
//     const { number } = req.body;

//     // const options = {
//     //   method: "GET",
//     //   url: "https://console.authkey.io/request",
//     //   params: {
//     //     authkey: "0c6a8cf83e6734d6",
//     //     sms: "Hello, This is test message from Authkey.io",
//     //     mobile: number,
//     //     country_code: "+91",
//     //     sender: "9911",
//     //   },
//     // };

//     // axios(options)
//     //   .then((response) => {
//     //     console.log(response);
//     //   })
//     //   .catch((error) => {
//     //     console.log("Error");

//     //     console.error(error,"Error");
//     //   });
//     const options = {
//       method: "GET",
//       url: "https://console.authkey.io/request",
//       params: {
//         authkey: "0c6a8cf83e6734d6",
//         sms: "Hello, your OTP is 1234",
//         mobile: number,
//         country_code: "91",
//         sender: "9911",
//       },
//     };

//     try {
//       const { data } =
//         await axios.get(`https://api.authkey.io/request?authkey=0c6a8cf83e6734d6&mobile=${number}&country_code=91&sms=Hello, your OTP is 1234&sender=9911&voice=Hello, your otp is 1234
// `);
//       console.log(data);
//       res.status(200).json({ data });
//     } catch (error) {
//       res
//         .status(400)
//         .json({ error: "Wrong Number. Please enter a valid number." });
//     }

//     // request(options, function (error, response, body) {
//     //   if (error) {
//     //     console.error(error);
//     //     return res.status(400).json({ error: "Failed to send OTP" });
//     //   }

//     //   console.log(body);
//     //   res.status(200).json({ message: "OTP sent successfully" });
//     // });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(400)
//       .json({ error: "Wrong Number. Please enter a valid number." });
//   }
// });
exports.getAllNotification = CatchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("notification");
    var number = 0;
    user.notification.map((i) => {
      if (!i.seen) number++;
    });
    res.status(200).json({
      notification: user.notification,
      number: number,
    });
  } catch (error) {}
});
exports.getRequestRefund = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({
    path: "planHistory.planId", // Specify the path to populate the planId
    model: "Plan", // Ensure you're populating the Plan model
  });

  res.status(200).json({
    refund: user.planHistory,
  });
});

exports.seenAllNotifications = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  user.notification.map(async (i) => {
    const n = await Notification.findByIdAndUpdate(i, { seen: true });
  });
  const u = await User.findById(req.user.id).populate("notification");
  res.status(200).json({
    notification: u.notification,
    number: 0,
  });
});
exports.removeNotifications = CatchAsyncErrors(async (req, res, next) => {
  const notify = await Notification.findByIdAndDelete(req.params.id);
  const user = await User.findById(req.user.id);
  const filteredData = user.notification?.filter(
    (i) => i.toString() !== req.params.id
  );
  user.notification = filteredData;
  await user.save();
  res.status(200).json({
    message: "Notification removed successfully",
    success: true,
  });
});
exports.matchUser = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("tenant");
  const listings = await Listing.find({ status: true }).populate("user");

  const matches = listings.map((listing) => {
    let matchCount = 0;
    const totalPreferences = user.prefrence.length;

    // Check matching criteria and limit contributions
    if (listing.gender === user.gender) matchCount++;
    if (listing.occupancy === user.tenant.occupancy) matchCount++;
    if (
      listing.approxRent <= user.tenant.approxRent + 1000 &&
      listing.approxRent >= user.tenant.approxRent - 1000
    )
      matchCount++;

    // Check highlights from the user's tenant preferences
    const highlightMatches = user.tenant.highlights.filter((highlight) =>
      listing.highlights.includes(highlight)
    );
    matchCount += highlightMatches.length; // Count highlight matches

    // Match preferences from the listing's user
    if (listing.user.prefrence) {
      listing.user.prefrence.forEach((listingPref) => {
        if (
          user.prefrence.some(
            (userPref) => userPref.prefrence === listingPref.prefrence
          )
        ) {
          matchCount += 10; // This could be adjusted if necessary
        }
      });
    }

    // Limit match count contribution  for a more normalized score
    const maxMatches = 3 + highlightMatches.length + totalPreferences * 10; // Define maximum possible matches
    const matchPercentage = maxMatches ? (matchCount / maxMatches) * 100 : 0;

    return {
      ...listing.toObject(),
      matchPercentage: matchPercentage.toFixed(2), // Two decimal places
    };
  });

  res.status(200).json({
    success: true,
    matches,
  });
});

exports.getListingMatchings = CatchAsyncErrors(async (req, res, next) => {
  // Fetch the listing by ID
  const listing = await Listing.findById(req.params.id).populate("user");
  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }

  // Fetch all users with the "flatemate" role
  const users = await User.find({ role: "flatemate" });

  const criteria = {
    location: 10,
    city: 10,
    gender: 10,
    approxRent: 10,
    occupancy: 10,
    preferenceMatch: 50,
  };

  const preferenceValues = [
    "Night Owl",
    "Early Bird",
    "Studious",
    "Fitness Freak",
    "Wanderer",
    "Party Lover",
    "Pet Lover",
    "Vegan",
    "Non Alcoholic",
    "Music Lover",
    "Non Smoker",
  ];

  const matchedUsers = users.map((user) => {
    let score = 0;
    let matchDetails = [];

    // Basic matching criteria
    if (user.city === listing.city) {
      score += criteria.city;
      matchDetails.push("city");
    }

    if (user.gender === listing.gender) {
      score += criteria.gender;
      matchDetails.push("gender");
    }

    // Approximate Rent matching (direct comparison)
    // if (listing.approxRent && user.tenant.approxRent) {
    //   if (
    //     listing.approxRent <= user.tenant.approxRent + 1000 &&
    //     listing.approxRent >= user.tenant.approxRent - 1000
    //   ) {
    //     score += criteria.approxRent;
    //     matchDetails.push("approxRent");
    //   }
    // }

    // Occupancy Matching
    // if (user.tenant.occupancy === listing.occupancy) {
    //   score += criteria.occupancy;
    //   matchDetails.push("occupancy");
    // }

    // Preference-based matching (User preferences vs Listing preferences)
    const userPreferences = user.prefrence.map((p) =>
      p.prefrence.toLowerCase()
    );
    const listingUserPreferences = listing.user.prefrence.map((p) =>
      p.prefrence.toLowerCase()
    );

    let preferenceMatchScore = 0;
    preferenceValues.forEach((preference) => {
      if (
        userPreferences.includes(preference.toLowerCase()) &&
        listingUserPreferences.includes(preference.toLowerCase())
      ) {
        preferenceMatchScore +=
          criteria.preferenceMatch / preferenceValues.length;
        matchDetails.push(preference);
      }
    });

    score += preferenceMatchScore;

    // Calculate the match percentage (score normalized)
    const maxScore = 100; // As criteria weights sum to 100
    const matchPercentage = (score / maxScore) * 100;

    return {
      user,
      matchPercentage: matchPercentage.toFixed(2),
      matchDetails,
    };
  });

  // Filter for users with a match percentage above zero, if needed
  const filteredMatches = matchedUsers.filter(
    (match) => match.matchPercentage > 0
  );

  res.status(200).json({ matches: filteredMatches });
});

// PLANS //

exports.assignPlanToUser = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { userId, planId } = req.body;
    const currentDate = new Date();

    const plan = await Plan.findById(planId);
    if (!plan) return next(new errorHanler("Plan not found", 404));

    const user = await User.findById(req.user.id); // Use userId from the request body
    if (!user) return next(new errorHanler("User not found", 404));

    // Check if the user already has a current plan
    if (user.currentPlan) {
      return next(new errorHanler("Already has an active plan", 400));
    }

    plan.users.push(user._id);
    await plan.save();

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + plan.days);

    user.planPurchaseDate = currentDate;
    user.currentPlan = plan._id;
    user.planExpiryDate = expiryDate;
    user.currentPaymentId = req.body.paymentId;
    await user.save();

    res.status(200).json({ message: "Plan assigned to user", user });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
});

exports.reportListing = CatchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const listing = await Listing.findById(req.params.id);

  const alreadyReported = listing.report.some(
    (report) => report.type.toString() === user._id.toString()
  );

  if (alreadyReported) {
    return res.status(400).json({
      message: "Already reported this listing",
    });
  }

  listing.report.push({
    type: user._id,
    message: req.body.message,
  });

  await listing.save();

  res.status(200).json({
    message: "Listing Reported Successfully",
  });
});

exports.requestRefund = CatchAsyncErrors(async (req, res, next) => {
  const { planId, startDate, expiryDate } = req.body;
  const id = planId?._id;
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const plan = user?.planHistory.find(
    (p) =>
      p.planId.toString() === id &&
      new Date(p.startDate).getTime() === new Date(startDate).getTime() &&
      new Date(p.expiryDate).getTime() === new Date(expiryDate).getTime()
  );

  if (!plan) {
    return res
      .status(404)
      .json({ message: "Plan not found in user plan history" });
  }

  plan.refundStatus = "In Process";

  await user.save();

  res.status(200).json({ message: "Refund status updated to In Process" });
});

exports.increaseView = CatchAsyncErrors(async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  listing.views = listing.views + 1;
  await listing.save();
  res.status(200).json({
    success: true,
  });
});

exports.increaseViewPg = CatchAsyncErrors(async (req, res, next) => {
  const listing = await Room.findById(req.params.id);
  listing.views = listing.views + 1;
  await listing.save();
  res.status(200).json({
    success: true,
  });
});

exports.getTeamDets = CatchAsyncErrors(async (req, res, next) => {
  const tenant = await Tenant.find({ isTeam: true }).populate("user");
  res.status(200).json({
    tenant,
    success: true,
  });
});

exports.getSearchListing = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { type, location } = req.params; // Extract parameters
    const regex = new RegExp(location, "i"); // Case-insensitive regex for partial match
    let listings = [];

    if (type === "listing") {
      listings = await Listing.find({ location: regex, status: true });
    } else if (type === "pg") {
      listings = await Room.find({ location: regex, status: true });
    } else if (type === "flat") {
      listings = await Listing.find({ location: regex, status: true })
        .populate({
          path: "user",
          select: "isFlatOwner",
        })
        .then((results) =>
          results.filter((listing) => listing.user?.isFlatOwner === true)
        );
    }

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    next(error); // Pass error to the error-handling middleware
  }
});

exports.deleteAccount = CatchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If the user is a 'flatemate', check and delete listings and tenant data
    if (user.role === "flatemate") {
      // Delete all listings associated with the user
      if (user.listing.length > 0) {
        for (let listingId of user.listing) {
          const listing = await Listing.findById(listingId);
          if (listing) {
            // Delete images from Cloudinary
            for (let image of listing.images) {
              await imagekit.deleteFile(image.fileId);
            }
            // Remove listing from DB
            await Listing.findByIdAndDelete(listingId);
          }
        }
      }

      // Delete tenant record if exists
      if (user.tenant) {
        await Tenant.findByIdAndDelete(user.tenant);
      }
      if (user.avatar.fileId) {
        await imagekit.deleteFile(user.avatar.fileId);
      }
    }
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
});
