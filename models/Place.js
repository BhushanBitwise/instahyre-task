const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true }
  },
  { timestamps: true }
);

placeSchema.index({ name: 1, address: 1 }, { unique: true });

module.exports = mongoose.model("Place", placeSchema);
