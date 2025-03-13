const ImageKit = require("imagekit");
const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const Listing = require("../models/listingModel");
const User = require("../models/userModel");
const Room = require("../models/roomModel");
var generator = require("generate-password");
var path = require("path");
const { sendMail } = require("./indexController");
const { sendmailPassword } = require("../nodemailer/nodemailer");
const City = require("../models/cityModel");
const Notification = require("../models/notificationModel");
const Plan = require("../models/planModel.js");
const Testimonial = require("../models/testimonialModel.js");
const { default: mongoose } = require("mongoose");
const moment = require("moment");
const Offer = require("../models/offerModel.js");
const imagekit = require("../middlewares/imagekit").initimagekit();

exports.admin = CatchAsyncErrors(async (req, res, next) => {
  try {
    const admin = await User.findById(req.user.id);
    res.status(200).json({
      admin,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// GET ALL USERS
// GET ALL USERS with pagination
exports.getAllUsers = CatchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page
    const skip = (page - 1) * limit;

    const users = await User.find({ role: "flatemate" })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({ role: "flatemate" });
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users,
      totalPages,
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET ALL Owner with pagination
exports.getAllOwner = CatchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page
    const skip = (page - 1) * limit;

    const users = await User.find({ role: "owner", flateOwner: false })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({ role: "owner" });
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users,
      totalPages,
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// GET ALL FLAT Owner with pagination
exports.getAllFlat = CatchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page
    const skip = (page - 1) * limit;

    const users = await User.find({ role: "flatemate", flateOwner: true })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments({ role: "owner" });
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users,
      totalPages,
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});
// GET USER ALL DETAILS
exports.getUserById = CatchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("listing")
      .populate("tenant")
      .populate("rooms")
      .populate("notification")
      .populate("currentPlan")
      .populate("planHistory.planId");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Server error",
    });
  }
});

// GET USER ALL DETAILS
exports.getOwnerById = CatchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("listing")
      .populate("tenant")
      .populate("rooms")
      .populate("notification")
      .populate("currentPlan")
      .populate("planHistory.planId");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Server error",
    });
  }
});

// GET ALL FLATS
exports.getAllListings = CatchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 listings per page
    const skip = (page - 1) * limit;

    const listings = await Listing.find()
      .populate("user")
      .skip(skip)
      .limit(limit);

    const totalListings = await Listing.countDocuments();
    const totalPages = Math.ceil(totalListings / limit);

    res.status(200).json({
      listings,
      totalPages,
      currentPage: page,
      totalListings,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    });
  }
});
// GET ALL FLATS
exports.getAllFlatData = CatchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 listings per page
    const skip = (page - 1) * limit;

    // Fetch listings where the user has flateOwner set to true
    const listings = await Listing.find()
      .populate({
        path: "user",
        match: { flateOwner: true }, // Only include users with flateOwner set to true
      })
      .skip(skip)
      .limit(limit)
      .exec();

    // Filter out any listings where user is null due to the match criteria
    const filteredListings = listings.filter((listing) => listing.user);

    // Calculate total listings that match the criteria
    const totalListings = filteredListings.length;
    const totalPages = Math.ceil(totalListings / limit);

    res.status(200).json({
      flat: filteredListings,
      totalPages,
      currentPage: page,
      totalListings,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    });
  }
});

// GET ALL PGS
exports.getAllPgs = CatchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 listings per page
    const skip = (page - 1) * limit;

    const rooms = await Room.find().populate("owner").skip(skip).limit(limit);

    const totalListings = await Room.countDocuments();
    const totalPages = Math.ceil(totalListings / limit);

    res.status(200).json({
      rooms,
      totalPages,
      currentPage: page,
      totalListings,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    });
  }
});
// Delete Listing
exports.deleteListingAdmin = CatchAsyncErrors(async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("user");
    const user = await User.findById(listing.user._id).exec();

    const filterList = user.listings.filter(
      (i) => i._id.toString() !== listing._id.toString()
    );
    user.listings = filterList;

    listing.images.forEach(async (i) => {
      await ImageKit.deleteFile(i.fileId);
    });
    const list = await Listing.findByIdAndDelete(req.params.id);
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

exports.changeListingStatus = CatchAsyncErrors(async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    listing.status = !listing.status;
    const { io } = require("../app.js");

    await listing.save();
    if (listing.status) {
      const dets = {
        title: "Your listing is verified successfully",
        description: "Congratulations your listing is now verified",
      };

      const noti = await new Notification(dets).save();
      // console.log(noti);

      const user = await User.findById(listing.user);
      // console.log(user);

      user.notification.push(noti._id);
      const send = {
        title: "Your listing is verified successfully",
        description: "Congratulations your listing is now verified",
        id: listing.user,
      };
      io.emit("userconnect", send);
      await user.save();
    }
    res.status(200).json({
      message: "Listing Status updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      error,
    });
  }
});

exports.changePgStatus = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { io } = require("../app.js");

    const pg = await Room.findById(req.params.id);
    pg.status = req.body.status;
    await pg.save();
    if (pg.status) {
      const dets = {
        title: "Your Pg is verified successfully",
        description: "Congratulations your Pg is now verified",
      };
      const noti = await new Notification(dets).save();
      // console.log(noti);

      const user = await User.findById(pg.owner);
      // console.log(user);

      user.notification.push(noti._id);
      io.emit("userconnect", dets);
      await user.save();
    }
    res.status(200).json({
      message: "PG Status updated successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      error,
    });
  }
});

// GET ALL Salesperson with pagination
exports.getAllSalesPerson = CatchAsyncErrors(async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 users per page
    const skip = (page - 1) * limit;

    const users = await User.find({ role: "admin" }).skip(skip).limit(limit);

    const totalUsers = await User.countDocuments({ role: "admin" });
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      users,
      totalPages,
      currentPage: page,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// CREATE SALESPERSON
exports.createSalesPerson = CatchAsyncErrors(async (req, res, next) => {
  var generatedPassword = generator.generate({
    length: 10,
    numbers: true,
  });
  const dets = {
    password: generatedPassword,
    contact: Number(req.body.contact),
    ...req.body,
  };

  const sales = await new User(dets).save();
  res.status(201).json({
    sales,
    message: "Sales Person Added Successfully",
  });
});
// UPDATE SALESPERSON
exports.changeSalesStatus = CatchAsyncErrors(async (req, res, next) => {
  try {
    var generatedPassword = generator.generate({
      length: 10,
      numbers: true,
    });
    const sales = await User.findById(req.params.id).select("+password");
    sales.isVerified = !sales.isVerified;
    sales.password = generatedPassword;
    await sales.save();
    if (sales.isVerified) {
      sendmailPassword(req, res, next, generatedPassword, sales);
    } else {
      res.status(200).json({
        message: "SalesPerson Status updated successfully",
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      error,
    });
  }
});

exports.uploadCity = CatchAsyncErrors(async (req, res, next) => {
  try {
    const city = await new City(req.body).save();
    try {
      const file1 = req.files.card;
      if (file1) {
        const modifiedFileName = `cardImage-${Date.now()}${path.extname(
          file1.name
        )}`;
        const { fileId, url } = await imagekit.upload({
          file: file1.data,
          fileName: modifiedFileName,
        });
        city.cardImage = { fileId, url };
      }

      const file2 = req.files.bg;
      if (file2) {
        const modifiedFileName = `bgImage-${Date.now()}${path.extname(
          file2.name
        )}`;
        const { fileId, url } = await imagekit.upload({
          file: file2.data, // Corrected this key
          fileName: modifiedFileName,
        });
        city.backgroundImage = { fileId, url };
      }
    } catch (error) {
      console.error("Image upload error:", error);
    }

    await city.save();
    res.json({
      message: "City Uploaded Successfully",
    });
  } catch (error) {
    console.error("Database error:", error);
  }
});

exports.deleteCity = CatchAsyncErrors(async (req, res, next) => {
  const city = await City.findById(req.params.id);
  await imagekit.deleteFile(city?.cardImage.fileId);
  await imagekit.deleteFile(city?.backgroundImage.fileId);
  const c = await City.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "City Removed Successfully",
  });
});
exports.getAllPlansAdmin = CatchAsyncErrors(async (req, res, next) => {
  const plan = await Plan.find();

  res.status(201).json({
    plan,
  });
});
exports.addPlan = CatchAsyncErrors(async (req, res, next) => {
  const dets = { ...req.body, description: JSON.parse(req.body.description) };
  const plan = await new Plan(dets).save();
  console.log(plan);

  res.status(201).json({
    message: "Plan added successfully",
  });
});
exports.editPlan = CatchAsyncErrors(async (req, res, next) => {
  // const dets = { ...req.body, description: JSON.parse(req.body.description) };
  const plan = await Plan.findByIdAndUpdate(req.params.id, req.body);
  res.status(201).json({
    message: "Plan Updated successfully",
  });
});

exports.uploadTestimonial = CatchAsyncErrors(async (req, res, next) => {
  const testimonial = await new Testimonial(req.body).save();

  const file = req.files.image;

  const modifiedFileName = `demoImage-${Date.now()}${path.extname(file.name)}`;
  const { fileId, url } = await imagekit.upload({
    file: file.data,
    fileName: modifiedFileName,
  });
  testimonial.image = { fileId, url };
  await testimonial.save();

  res.status(201).json({
    message: "Testimonial added successfully",
  });
});
exports.deleteTestimonial = CatchAsyncErrors(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  await imagekit.deleteFile(testimonial.image.fileId);

  res.status(201).json({
    message: "Testimonial deleted successfully",
  });
});
exports.findRefund = CatchAsyncErrors(async (req, res, next) => {
  try {
    const users = await User.find({
      planHistory: { $elemMatch: { refundStatus: { $ne: "Request" } } },
    }).populate("planHistory.planId");

    if (users.length === 0) {
      return res.status(404).json({
        message: 'No users found with refund status other than "Request"',
      });
    }

    res.status(200).json({
      refund: users,
    });
  } catch (error) {
    res.status(500).json({ message: "Error finding users", error });
  }
});

exports.changerequestRefundStatus = CatchAsyncErrors(async (req, res, next) => {
  const { userId, planId, startDate, expiryDate, status } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  console.log(planId);

  const plan = user?.planHistory.find(
    (p) => p.planId.toString() === planId
    // new Date(p.startDate).getTime() === new Date(startDate).getTime() &&
    // new Date(p.expiryDate).getTime() === new Date(expiryDate).getTime()
  );

  if (!plan) {
    return res
      .status(404)
      .json({ message: "Plan not found in user plan history" });
  }

  plan.refundStatus = status;

  await user.save();

  res.status(200).json({ message: "Refund status updated to In Process" });
});

exports.getListingDashboardData = CatchAsyncErrors(async (req, res) => {
  try {
    if (req.params.filter === "Months") {
      const monthlyData = await Listing.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            year: "$_id.year",
            month: { $subtract: ["$_id.month", 1] },
            count: 1,
            _id: 0,
          },
        },
        { $sort: { month: 1 } },
      ]);

      const yearlyData = await Listing.aggregate([
        {
          $group: {
            _id: { year: { $year: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            year: "$_id.year",
            count: 1,
            _id: 0,
          },
        },
      ]);

      return res.status(200).json({ data: monthlyData, yearlyData });
    } else if (req.params.filter === "Gender") {
      const genderData = await Listing.aggregate([
        {
          $group: {
            _id: "$gender",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            gender: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ]);

      return res.status(200).json({ data: genderData });
    }
    res.json({
      success: false,
    });
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.dashboardDetails = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { filterType, startDate, endDate } = req.query;
    const plans = await Plan.find().populate("users");
    const listings = await Listing.find();

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const today = currentDate.toISOString().split("T")[0];

    let totalIncome = 0;
    let totalUsers = 0;
    let planDetails = [];
    let totalListings = 0;

    const isWithinRange = (userDate, start, end) => {
      const userCreatedAt = new Date(userDate).toISOString().split("T")[0];
      return userCreatedAt >= start && userCreatedAt <= end;
    };

    const calculateData = (startDate, endDate) => {
      plans.forEach((plan) => {
        const filteredUsers = plan.users.filter((user) =>
          isWithinRange(user.createdAt, startDate, endDate)
        );

        const userCount = filteredUsers.length;
        totalUsers += userCount;
        totalIncome += plan.price * userCount;

        planDetails.push({
          planName: plan.planName,
          userCount,
          revenue: plan.price * userCount,
        });
      });

      totalListings = listings.filter((listing) =>
        isWithinRange(listing.createdAt, startDate, endDate)
      ).length;
    };

    switch (filterType) {
      case "Daily":
        calculateData(today, today);
        break;
      case "Weekly":
        const startOfWeek = new Date();
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        calculateData(startOfWeek.toISOString().split("T")[0], today);
        break;
      case "Monthly":
        calculateData(
          new Date(currentYear, currentMonth, 1).toISOString().split("T")[0],
          today
        );
        break;
      case "Yearly":
        calculateData(
          new Date(currentYear, 0, 1).toISOString().split("T")[0],
          today
        );
        break;
      case "Custom Date":
        if (!startDate || !endDate) {
          return res.status(400).json({
            success: false,
            message:
              "Please provide both startDate and endDate for custom range.",
          });
        }
        calculateData(startDate, endDate);
        break;
      default:
        return res.status(400).json({
          success: false,
          message:
            "Invalid filter type. Use 'Daily', 'Weekly', 'Monthly', 'Yearly', or 'Custom Date'.",
        });
    }

    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        totalUsers,
        totalListings,
        planDetails,
      },
    });
  } catch (error) {
    next(error);
  }
});

exports.getFlatematesGraphData = CatchAsyncErrors(async (req, res, next) => {
  try {
    const { role, gender, city, plans, currentPlanName } = req.query;

    var filter = { role: role };
    if (role === "flat") {
      filter = { role: "flatemate", flateOwner: true };
    }
    // Split the plans parameter into planName and price
    if (plans && plans !== "undefined") {
      const [planName, price] = plans.split("/");
      filter["planHistory.planName"] = planName; // Match planName
      filter["planHistory.price"] = price; // Match price
    }

    if (gender && gender !== "undefined") filter.gender = gender;
    if (city && city !== "undefined") filter.city = city;

    const graphData = await User.aggregate([
      // Match users based on the initial filter
      { $match: filter },

      // Lookup to populate `currentPlan` with plan details
      {
        $lookup: {
          from: "plans", // Plan collection name
          localField: "currentPlan",
          foreignField: "_id",
          as: "currentPlanDetails",
        },
      },

      // Match users whose current plan matches the specified currentPlanName
      ...(currentPlanName
        ? [
            {
              $match: {
                "currentPlanDetails.planName": currentPlanName,
              },
            },
          ]
        : []),

      // Group users by year and month
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },

      // Sort data by year and month
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // Transform data into a full-year format (Jan-Dec)
    const fullYearData = Array(12).fill(0);
    graphData.forEach((data) => {
      const { month } = data._id;
      fullYearData[month - 1] = data.count; // Map month to index (Jan=0, Feb=1, etc.)
    });

    res.status(200).json({
      success: true,
      data: fullYearData, // Array with counts for each month
    });
  } catch (error) {
    next(error);
  }
});
exports.getYearlyUserData = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(`${currentYear}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${currentYear}-12-31T23:59:59.999Z`);

    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfYear, $lte: endOfYear }, // Filter by year
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          flatmates: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$role", "flatemate"] },
                    { $eq: ["$flateOwner", false] },
                  ],
                },
                1,
                0,
              ],
            },
          },
          pgOwners: { $sum: { $cond: [{ $eq: ["$role", "owner"] }, 1, 0] } },
          flatOwners: {
            $sum: { $cond: [{ $eq: ["$flateOwner", true] }, 1, 0] },
          },
        },
      },
      { $sort: { _id: 1 } }, // Sort by month
    ]);

    // Format data for ApexCharts
    const formattedData = {
      months: Array.from({ length: 12 }, (_, i) =>
        moment().month(i).format("MMMM")
      ), // Jan - Dec
      flatmates: Array(12).fill(0),
      pgOwners: Array(12).fill(0),
      flatOwners: Array(12).fill(0),
    };

    data.forEach((item) => {
      const monthIndex = item._id - 1;
      formattedData.flatmates[monthIndex] = item.flatmates;
      formattedData.pgOwners[monthIndex] = item.pgOwners;
      formattedData.flatOwners[monthIndex] = item.flatOwners;
    });

    res.status(200).json({ data: formattedData });
  } catch (error) {
    console.error("Error fetching yearly user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createOffer = CatchAsyncErrors(async (req, res, next) => {
  try {
    const offer = await new Offer().save();
    res.status(201).json({
      message: "offer created",
      offer,
    });
  } catch (error) {}
});
exports.updateOffer = CatchAsyncErrors(async (req, res, next) => {
  try {
    const offer = await Offer.findOne();
    offer.text = req.body.text;
    await offer.save();
    res.status(201).json({
      message: "Offer Text saved successfully",
      offer,
    });
  } catch (error) {}
});

exports.updateOfferImage = CatchAsyncErrors(async (req, res, next) => {
  try {
    const offer = await Offer.findOne();
    const file = req.files.image;

    const modifiedFileName = `bannerImage-${Date.now()}${path.extname(
      file.name
    )}`;
    const { fileId, url } = await imagekit.upload({
      file: file.data,
      fileName: modifiedFileName,
    });
    offer.banner = { fileId, url };
    await offer.save();
    res.status(201).json({
      message: "Offer banner saved successfully",
      offer,
    });
  } catch (error) {}
});
