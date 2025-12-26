const Place = require("../models/Place");
const Review = require("../models/Review");


exports.searchPlaces = async (req, res) => {
  const { name, minRating } = req.query;

  // Places find kar rahe hain
  // if->Agar name diya hai: RegExp(name, "i") matlab partial + case-insensitive search  |   else-> Agar name nahi diya: {} → saare places le aao 
  const places = await Place.find(name ? { name: new RegExp(name, "i") } : {} );
// Result store karne ke liye array
  const results = [];

// Har place pe loop
  for (const place of places) 
  { // Ek-ek place ke liye-> reviews lao , average rating nikalo
    // jis place ka _id hai usi place ke saare reviews
    const reviews = await Review.find({ place: place._id });
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);

    // Average rating nikal rahe hain
    const averageRating = reviews.length ? total / reviews.length : 0;

    // agar user ne minRating nahi diya → sab chalega agar diya → sirf wahi place jiska avg rating zyada hai -->  and then  Final result push
    if (!minRating || averageRating >= minRating) 
        results.push({ id: place._id, name: place.name, averageRating });
    
  }

  res.json(results);
};



exports.placeDetails = async (req, res) => {
  // Place fetch kar rahe  URL se id aayi Us id ka exact place mil gaya
  const place = await Place.findById(req.params.id);

  const reviews = await Review.find({ place: place._id })
    .populate("user", "name") //Place ke saare reviews
    .sort({ createdAt: -1 }); // review ke saath user ka sirf name -> newest review pehle

    // req.userId JWT middleware se aata hai ->  agar current user ne review diya hai  agar current user ne review diya hai
  const myReview = reviews.find( r => r.user._id.toString() === req.userId );

  // Current user ke alawa sab reviews
  const otherReviews = reviews.filter( r => r.user._id.toString() !== req.userId );
// Final response
  res.json({
    place,
    reviews: myReview ? [myReview, ...otherReviews] : otherReviews
  });
};
