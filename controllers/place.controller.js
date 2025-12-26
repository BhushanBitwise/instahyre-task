const Place = require("../models/Place");
const Review = require("../models/Review");


exports.searchPlaces = async (req, res) => {
 
  // example: /places/search?name=City&minRating=4
  const { name, minRating } = req.query;

  let places = [];

  if (name) {
    //  Agar name diya hai to ->  pehle exact name match wale places lao
    const exactMatches = await Place.find({ name });

    //  Phir partial name match wale places lao
    // exact matches ko exclude kar rahe hain ($nin)
    const partialMatches = await Place.find({
      name: new RegExp(name, "i"), // partial + case-insensitive
      _id: { $nin: exactMatches.map(p => p._id) }
    });

    // Exact match pehle, partial baad me
    places = [...exactMatches, ...partialMatches];
  } else 
    places = await Place.find(); // Agar name nahi diya → saare places lao
  
  const results = [];

  // Har place ke liye loop
  for (const place of places) {
    // Current place ke saare reviews nikal rahe hain
    const reviews = await Review.find({ place: place._id });

    // Sab ratings ka total nikal rahe hain
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);

    // Average rating calculate
    // agar reviews nahi hai to avg = 0
    const averageRating = reviews.length ? total / reviews.length : 0;

    // Agar minRating nahi diya → sab allow
    // Agar diya → sirf wahi place jiska avg >= minRating
    if (!minRating || averageRating >= Number(minRating)) {
      results.push({
        id: place._id,
        name: place.name,
        averageRating
      });
    }
  }

  // Search result client ko bhej rahe hain
  res.json(results);
};


exports.placeDetails = async (req, res) => {
  // URL se place id aayi, us id ka exact place fetch kar rahe hain
  const place = await Place.findById(req.params.id);

  // Is place ke saare reviews nikal rahe hain
  // populate("user","name") → review ke sath user ka sirf name
  // sort({createdAt:-1}) → newest review pehle
  const reviews = await Review.find({ place: place._id })
    .populate("user", "name")
    .sort({ createdAt: -1 });

  // Average rating calculate (place details ke liye)
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = reviews.length ? total / reviews.length : 0;

  // Logged-in user ka review dhoondh rahe hain
  // req.userId JWT middleware se aata hai
  const myReview = reviews.find(
    r => r.user._id.toString() === req.userId
  );

  // Current user ke alawa baaki sab reviews
  const otherReviews = reviews.filter(
    r => r.user._id.toString() !== req.userId
  );

  // Final response:
  // agar current user ka review hai → sabse upar
  // warna sirf baaki reviews
  res.json({
    place: {
      id: place._id,
      name: place.name,
      address: place.address,
      averageRating
    },
    reviews: myReview ? [myReview, ...otherReviews] : otherReviews
  });
};
