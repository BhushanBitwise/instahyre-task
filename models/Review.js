const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5, required: true },
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" }
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, place: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
