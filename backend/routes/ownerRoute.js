const {
  addPg,
  loginOwner,
  updatePg,
  deletePg,
  isOwner,
  getAllPg,
  uploadRentAgreement,
  getOwnerPg,
} = require("../controllers/ownerController");
const { authorizeRoles } = require("../jwt/sendToken");
const { isAuthenticated } = require("../middlewares/auth");
// const { isAuthenticatedOwner } = require("../middlewares/auth");

const router = require("express").Router();

// router.post("/add/pg",isAuthenticatedOwner,addPg)
router.post("/signin", loginOwner);
// Owner is logged in or not
router.get("/owner", isAuthenticated, authorizeRoles("owner"), isOwner);

// Add PG DETAILS
router.post("/add/pg", isAuthenticated, authorizeRoles("owner"), addPg);
// GET PG
router.get("/get/pg", isAuthenticated, authorizeRoles("owner"), getAllPg);
// Edit PG DETAILS
router.post(
  "/update/pg/:id",
  isAuthenticated,
  authorizeRoles("owner"),
  updatePg
);
// Delete Pg
router.get(
  "/delete/pg/:id",
  isAuthenticated,
  authorizeRoles("owner"),
  deletePg
);
// GET OWNER PG's
router.get("/owner/pg", isAuthenticated, authorizeRoles("owner"), getOwnerPg);
// ADD RENTAGREEMENT
router.post(
  "/add/rentsgreement",
  isAuthenticated,
  authorizeRoles("owner"),
  uploadRentAgreement
);

module.exports = router;
