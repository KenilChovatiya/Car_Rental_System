const mongoose = require('mongoose');
const validator = require("validator");

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    brand: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    type: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 50
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
    numOfSeats: {
        type: Number,
        min: 1,
        max: 255,
        default: 5
    },
    numOfDoors: {
        type: Number,
        min: 1,
        max: 255,
        default: 4
    },
    airConditioner: {
        type: Boolean,
        default: false
    },
    numInStock: {
        type: Number,
        required: true,
        min: 0,
    },
    dailyRentalRate: {
        type: Number,
        required: true, 
        min: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
    }

}, { timestamps: true });

module.exports = mongoose.model("car", carSchema);