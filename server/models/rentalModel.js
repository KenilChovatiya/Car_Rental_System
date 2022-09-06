const mongoose = require('mongoose');
const validator = require("validator");

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    reservationDetails:{
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
        age:{
            type: Number,
            required: true
        },
        mobile: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        pinCode: {
            type: Number,
            required: true,
        },
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "car",
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
        required: true
    },
    qty:{
      type: Number,
      min: 0,
      default: 1,
      required: true  
    },
    rentalFee: {
        type: Number,
        min: 0,
        required: true
    },
    paymentStatus:{
        type: String,
        required: true,
        default: "COD"
    },
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        },
    },
    status:{
        type: String,
        required: true,
        default: "Processing"
    }
}, {timestamps: true});

module.exports = mongoose.model("rental", rentalSchema);