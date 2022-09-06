const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/car_rental")
    .then((data)=>{console.log('Databse Connection Successfully');});

}

module.exports = connectDatabase;