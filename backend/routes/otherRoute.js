const { getPgDetail, getListingById, getAllPg, getAllListings, getAllCity, getCityById, getFilterData, getAllPlan, getUserByID, getTestimonial, getFilterTenant } = require("../controllers/otherController");

const router = require("express").Router();

// Get Pg Detail by id
router.get("/get/pg/:id",getPgDetail)
// GET USER BY ID
router.get("/get/user/:id",getUserByID)
// Get Listing Detail By id
router.get("/get/listing/:id",getListingById);
// GET ALL PG
router.get("/get/all/pg",getAllPg)
// GET ALL Listings
router.get("/get/all/listing",getAllListings)

// GET ALL CITY
router.get("/get/city",getAllCity)
// GET BY ID
router.get("/get/city/:id",getCityById)
// FILTER DATA 
router.get("/get/filter/data",getFilterData);
// GET TENANT FILTER
router.get("/get/filter/tenant",getFilterTenant);

router.get("/get/all/plan",getAllPlan)
// GET TESTIMONMIALS
router.get("/get/testimonial",getTestimonial)
module.exports = router;