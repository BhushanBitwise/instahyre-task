/*********************************
 * ALL IMPORTS AT TOP (GOOD PRACTICE)
 *********************************/
const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const mainRoutes = require("./routes/routes");

const errorMiddleware = require("./middlewares/error.middleware");

dotenv.config();
const app = express();


connectDB();

app.use(express.json());

// API 
app.use("/api", mainRoutes);


app.use(errorMiddleware);


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
