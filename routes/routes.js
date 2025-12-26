const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");

const { register } = require("../controllers/auth.controller");
const { addReview } = require("../controllers/review.controller");
const { searchPlaces, placeDetails } = require("../controllers/place.controller");

// AUTH
router.post("/register", register);

// REVIEW (protected)
router.post("/review", auth, addReview);

// PLACE SEARCH & DETAILS (protected)
router.get("/places/search", auth, searchPlaces);
router.get("/places/:id", auth, placeDetails);

module.exports = router;
