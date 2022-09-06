const carModel = require("../models/carModel");
const rentalModel = require("../models/rentalModel");

// get all rental cars --admin
const getAllRentalCars = async (req, res) => {
    try {
        const rentalCars = await rentalModel.find().sort({ createdAt: -1 }).populate("car");
        if (!rentalCars) {
            return res.status(404).json({ success: false, message: "Rentals Car Not Found" });
        }

        res.status(200).json({ success: true, rentalCars });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" + error });

    }
}

// Get my rental cars
const getMyRentalCars = async (req, res) => {
    try {
        const rentalCars = await rentalModel.find({ user: req.user.id }).sort({ createdAt: -1 }).populate("car");
        if (!rentalCars) {
            return res.status(404).json({ success: false, message: "Rental Car Not Found" });
        }

        res.status(200).json({ success: true, rentalCars });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" + error });

    }
}

// Get Single Rental Car Details
const getSingleRentalCar = async (req, res) => {
    try {
        const rentalCar = await rentalModel.findById(req.params.id).populate("car");
        if (!rentalCar) {
            return res.status(404).json({ success: false, message: "Rental Car Not Found" });
        }
        res.status(200).json({ success: true, rentalCar });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error " + error });
    }
}

// Book Car
const bookCar = async (req, res) => {
    try {
        req.body.user = req.user.id;
        const car = await carModel.findById(req.body.car);
        if (!car) {
            return res.status(404).json({ success: false, message: "Car Not Found" });
        }

        if (car.numInStock === 0 || car.numInStock - req.body.qty <= -1) {
            return res.status(201).json({ success: false, message: "Car Is Not Availabel" });
        }

        const newBookCar = new rentalModel(req.body);
        const bookcar = await newBookCar.save();

        // await car.updateOne({ numInStock: car.numInStock - bookcar.qty });
        res.status(200).json({ success: true, bookcar });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error " + error });
    }
}

// Delete a Rental car
const deleteRentalCar = async (req, res) => {
    try {
        const rentalCar = await rentalModel.findById(req.params.id);
        if (!rentalCar) {
            return res.status(404).json({ success: false, message: "Rental Car Not Found" });
        }
        await rentalCar.remove();
        res.status(200).json({ success: true, message: "Rental Car Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error " + error });
    }
}

// // update Rental Car Status -- Admin
const updateRentalCarStatus = async (req, res, next) => {
    try {
        const rentalCar = await rentalModel.findById(req.params.id);
        const car = await carModel.findById(rentalCar.car);
        if (!rentalCar) {
            return res.status(404).json({ success: false, message: "Rental Car Not Found" });
        }

        if (rentalCar.status === "Completed") {
            return res.status(400).json({ success: false, message: "You have already completed" });
        }

        if (req.body.status === "Confirmed") {
            await car.updateOne({ numInStock: car.numInStock - rentalCar.qty });
        }

        rentalCar.status = req.body.status;

        await rentalCar.save({ validateBeforeSave: false });

        res.status(200).json({ success: true });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error " + error });
    }
};

module.exports = { bookCar, getAllRentalCars, getMyRentalCars, getSingleRentalCar, deleteRentalCar, updateRentalCarStatus };