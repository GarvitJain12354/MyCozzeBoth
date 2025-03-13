const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const City = require("../models/cityModel");
const Listing = require("../models/listingModel");
const Plan = require("../models/planModel");
const Room = require("../models/roomModel");
const Tenant = require("../models/tenantModel");
const Testimonial = require("../models/testimonialModel");
const User = require("../models/userModel");

exports.getPgDetail = CatchAsyncErrors(async (req, res, next) => {
  try {
    const pg = await Room.findById(req.params.id).populate({
      path: "owner",
      select: "firstname lastname avatar city contact -_id",
    });
    res.status(200).json({
      pg,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getUserByID = CatchAsyncErrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      user,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getListingById = CatchAsyncErrors(async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate({
      path: "user",
      select: "firstname lastname email avatar gender prefrence contact _id",
    });
    res.status(200).json({
      listing,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getAllPg = CatchAsyncErrors(async (req, res, nexrt) => {
  try {
    const pg = await Room.find({ status: "Published" }).populate({
      path: "owner",
      select: "firstname lastname avatar city -_id",
    });
    res.status(200).json({
      pg,
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
    const list = await Listing.find({
      status: true,
    }).populate({
      path: "user",
      select: "firstname lastname avatar city -_id",
    });
    res.status(200).json({
      list,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
exports.getAllCity = CatchAsyncErrors(async (req, res, next) => {
  try {
    const city = await City.find();
    res.status(200).json({
      city,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

exports.getCityById = CatchAsyncErrors(async (req, res, next) => {
  try {
    const city = await City.findById(req.params.id);
    res.status(200).json({
      city,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
const getBudgetRange = (budget) => {
  const sanitizedBudget = budget.trim().toLowerCase();

  if (/^upto\s*5k$/.test(sanitizedBudget)) return { min: 0, max: 5000 };
  if (/^10k\s*-\s*15k$/.test(sanitizedBudget))
    return { min: 10000, max: 15000 };
  if (/^15k\s*-\s*20k$/.test(sanitizedBudget))
    return { min: 15000, max: 20000 };
  if (/^20k\s*-\s*30k$/.test(sanitizedBudget))
    return { min: 20000, max: 30000 };
  if (/^30k\s*-\s*40k$/.test(sanitizedBudget))
    return { min: 30000, max: 40000 };
  if (/^40k\+$/.test(sanitizedBudget)) return { min: 40000, max: Infinity };

  return null;
};
const getCityAndState = (location) => {
  const parts = location.split(","); // Split address by commas
  const city = parts.length > 1 ? parts[0].trim() : null; // First part as city
  const state = parts.length > 2 ? parts[parts.length - 2].trim() : null; // Second last as state
  return { city, state };
};

exports.getFilterData = CatchAsyncErrors(async (req, res, next) => {
  const { type, location, budget, gender } = req.query;

  let query = {};

  if (type === "Roommate") {
    query.status = true;

    if (gender && gender !== "Any") {
      query.gender = gender;
    }

    if (location && location !== "Select a city") {
      query.location = location;
    }

    const budgetRange = getBudgetRange(budget);
    if (budgetRange) {
      query.approxRent = { $gte: budgetRange.min, $lte: budgetRange.max };
    }

    const listn = await Listing.find();
    console.log(listn, 324);

    const list = await Listing.find(query).populate("user");
    return res.json({ success: true, data: list });
  }

  if (type === "PG") {
    query.status = "Published";

    if (location && location !== "Select a city") {
      query.location = location;
    }

    if (gender && gender !== "Any") {
      query.gender = gender;
    }

    const budgetRange = getBudgetRange(budget);
    if (budgetRange) {
      query.$or = [
        {
          "rent.single": {
            $gte: String(budgetRange.min),
            $lte: String(budgetRange.max),
          },
        },
        {
          "rent.double": {
            $gte: String(budgetRange.min),
            $lte: String(budgetRange.max),
          },
        },
        {
          "rent.triple": {
            $gte: String(budgetRange.min),
            $lte: String(budgetRange.max),
          },
        },
      ];
    }

    const list = await Room.find(query).populate("owner");
    return res.json({ success: true, data: list });
  }
  if (type === "Flat") {
    query.status = "Published";

    if (location && location !== "Select a city") {
      query.location = location;
    }

    if (gender && gender !== "Any") {
      query.gender = gender;
    }

    const budgetRange = getBudgetRange(budget);
    if (budgetRange) {
      query.$or = [
        {
          "rent.single": {
            $gte: String(budgetRange.min),
            $lte: String(budgetRange.max),
          },
        },
        {
          "rent.double": {
            $gte: String(budgetRange.min),
            $lte: String(budgetRange.max),
          },
        },
        {
          "rent.triple": {
            $gte: String(budgetRange.min),
            $lte: String(budgetRange.max),
          },
        },
      ];
    }
    query.isFlat = true;
    const list = await Listing.find(query).populate("owner");
    return res.json({ success: true, data: list });
  }

  // Default case: Get all active listings
  const list = await Listing.find({ status: true }).populate("user");
  res.status(200).json({ data: list, success: true });
});

exports.getFilterTenant = CatchAsyncErrors(async (req, res, next) => {
  const location = req.query.city;
  const budget = req.query.budget;
  const Sgender = req.query.gender;
  const budgetRange = getBudgetRange(budget);
  const query = { city: location };
  console.log(query);

  if (budgetRange) {
    query.approxRent = { $gte: budgetRange.min, $lte: budgetRange.max };
  }
  if (Sgender !== "Any" && Sgender) {
    query.gender = Sgender;
  }
  console.log(query);

  const list = await Tenant.find(query).populate("user");

  res.status(200).json({ data: list, success: true });
});
exports.getAllPlan = CatchAsyncErrors(async (req, res, next) => {
  const plan = await Plan.find({
    status: true,
  });
  res.status(200).json({
    plan,
  });
});

exports.getTestimonial = CatchAsyncErrors(async (req, res, next) => {
  const testimonial = await Testimonial.find();
  res.status(200).json({
    testimonial,
  });
});
