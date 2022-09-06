const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email:{
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    mobile:{
        type: Number,
        required: [true, "Please Enter Your Mobile"],
        unique: true,
        maxLength: [10, "Mobile maximum 10 digits are long"],
        minLength: [10, "Mobile minimum 10 digits are long"],
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
}, {timestamps: true});

module.exports = mongoose.model("user", userSchema);