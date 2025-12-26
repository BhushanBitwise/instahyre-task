const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { name, phone } = req.body;

  const exists = await User.findOne({ phone });
  if (exists) {
    return res.status(400).json({ message: "Phone already registered" });
  }

  const user = await User.create({ name, phone });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};
