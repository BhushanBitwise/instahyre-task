const Place = require("../models/Place");
const Review = require("../models/Review");


exports.addReview = async (req, res) => {
  const { name, address, rating, text } = req.body;

  let place = await Place.findOne({ name, address });

  if (!place) 
    place = await Place.create({ name, address });


  const review = await Review.create({
    rating,
    text,
    user: req.userId,
    place: place._id
  });

  res.json(review);
};
