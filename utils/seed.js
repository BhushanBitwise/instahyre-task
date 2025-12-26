const mongoose = require("mongoose");
const User = require("../models/User");
const Place = require("../models/Place");
const Review = require("../models/Review");
require("dotenv").config();

const runSeed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected for seeding");

  await User.deleteMany();
  await Place.deleteMany();
  await Review.deleteMany();

  const users = await User.insertMany([
    { name: "Amit", phone: "9000000001" },
    { name: "Rahul", phone: "9000000002" },
    { name: "Neha", phone: "9000000003" }
  ]);

  const places = await Place.insertMany([
    { name: "City Cafe", address: "MG Road" },
    { name: "Green Hospital", address: "FC Road" },
    { name: "Book World", address: "College Road" }
  ]);

  await Review.insertMany([
    {
      rating: 5,
      text: "Excellent place",
      user: users[0]._id,
      place: places[0]._id
    },
    {
      rating: 4,
      text: "Good service",
      user: users[1]._id,
      place: places[0]._id
    },
    {
      rating: 3,
      text: "Average experience",
      user: users[2]._id,
      place: places[1]._id
    }
  ]);

  console.log("Seed data inserted successfully");
  process.exit();
};

runSeed();
