const {
  admin,
  getAllUsers,
  getAllListings,
  deleteListingAdmin,
  changeListingStatus,
  getAllPgs,
  changePgStatus,
  getAllSalesPerson,
  createSalesPerson,
  changeSalesStatus,
  uploadCity,
  deleteCity,
  addPlan,
  editPlan,
  getAllPlansAdmin,
  getAllFlatData,
  uploadTestimonial,
  deleteTestimonial,
  findRefund,
  changerequestRefundStatus,
  getUserById,
  getAllOwner,
  getOwnerById,
  getListingDashboardData,
  dashboardDetails,
  getFlatematesGraphData,
  getAllFlat,
} = require("../controllers/adminController");
const { resetPassword } = require("../controllers/indexController");
const { authorizeRoles } = require("../jwt/sendToken");
const { isAuthenticated } = require("../middlewares/auth");

const router = require("express").Router();
router.get("/admin", isAuthenticated, authorizeRoles("superAdmin"), admin);
// get all users
router.get(
  "/get/user",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getAllUsers
);
router.get(
  "/get/user/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getUserById
);

router.get(
  "/get/owner/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getOwnerById
);

// get all users
router.get(
  "/get/owner",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getAllOwner
);
router.get(
  "/get/flat",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getAllFlat
);
// get all listings
router.get(
  "/get/listing",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getAllListings
);
// GET ALL FLATS LISTINGS
router.get(
  "/get/flats",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getAllFlatData
);
// get all pg
router.get("/get/pg", isAuthenticated, authorizeRoles("superAdmin"), getAllPgs);
// Delete Listing Admin
router.get(
  "/delete/listing/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  deleteListingAdmin
);

router.get(
  "/update/status/listing/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  changeListingStatus
);
router.post(
  "/update/status/pg/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  changePgStatus
);
// get all Salesperson
router.get(
  "/get/sales",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getAllSalesPerson
);

// create Salesperson
router.post(
  "/register/sales",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  createSalesPerson
);

// Update Salesperson
router.get(
  "/update/status/sales/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  changeSalesStatus
);
// UPLOAD CITY
router.post(
  "/upload/city",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  uploadCity
);
router.get(
  "/delete/city/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  deleteCity
);

router.post(
  "/add/plan",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  addPlan
);
router.get(
  "/get/all/plan",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getAllPlansAdmin
);
router.post(
  "/edit/plan/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  editPlan
);
router.post(
  "/upload/testimonial",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  uploadTestimonial
);
router.get(
  "/delete/testimonial/:id",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  deleteTestimonial
);
router.get(
  "/get/refund",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  findRefund
);
router.post(
  "/update/status/refund",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  changerequestRefundStatus
);

router.post(
  "/reset/password",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  resetPassword
);

router.get(
  "/dashboard/listing/:filter",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getListingDashboardData
);
router.get(
  "/dashboard/details",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  dashboardDetails
);
router.get(
  "/dashboard/flatmate/details",
  isAuthenticated,
  authorizeRoles("superAdmin"),
  getFlatematesGraphData
);
module.exports = router;
