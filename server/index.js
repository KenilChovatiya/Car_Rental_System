const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const express = require('express');
const connectDatabase = require('./db');
const app = express();
const cors =  require("cors");
const authRoute = require('./routes/authRoute');
const carRoute = require('./routes/carRoute');
const rentalRoute = require('./routes/rentalRoute');
const userRoute = require('./routes/userRoute');
const paymentRoute = require('./routes/paymentRoute');
connectDatabase();

// Middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})

// Routes
app.use("/api/auth", authRoute);
app.use("/api/car", carRoute);
app.use("/api/rental", rentalRoute);
app.use("/api/user", userRoute);
app.use("/api/", paymentRoute);

app.listen(process.env.PORT, () => {
    console.log("server listened at ", process.env.PORT);
});