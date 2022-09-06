const carModel = require("../models/carModel");
const cloudinary = require("cloudinary");


// Get All Cars
const getAllCars = async (req, res) => {
    try {
        let cars = await carModel.find();

        if (req.query) {
            const queryCopy = { ...req.query };
            
            const removeFields = ["keyword", "page", "limit"];
            removeFields.forEach((ele) => { delete queryCopy[ele] });

            // Filter For Daily Rental Rate
            let queryStr = JSON.stringify(queryCopy);
            queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
            queryStr = JSON.parse(queryStr);

            if(queryCopy.type?.includes('_')){
                delete queryStr['type'];
                queryStr.type = { $in : queryCopy.type.split("_") };
            }

            if(req.query.keyword){
                queryStr.name = {
                    $regex: req.query.keyword,
                    $options: "i",
                }
            }

            cars = await carModel.find(queryStr);

        }

        if (!cars) {
            return res.status(404).json({ success: false, message: "Cars Not Found" });
        }

        res.status(200).json({ success: true, cars });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error " + error });

    }
}

// Get Single Car Details
const getCarDetails = async (req, res) => {
    try {
        let car = await carModel.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ success: false, message: "Car Not Found" });
        }

        res.status(200).json({ success: true, car });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error " + error });

    }
}

// Creat a new car
const createCar = async (req, res) => {
    try {
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "cars",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;

        req.body.user = req.user.id;
        const newCar = new carModel(req.body);
        const car = await newCar.save();
        res.status(200).json({ success: true, car });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" + error });

    }
}

// Update a car
const updateCar = async (req, res) => {
    try {

        let car = await carModel.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ success: false, message: "Car Not Found" });
        }

        // Images Start Here
        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        if (images !== undefined) {
            // Deleting Images From Cloudinary
            for (let i = 0; i < car.images.length; i++) {
                await cloudinary.v2.uploader.destroy(car.images[i].public_id);
            }

            const imagesLinks = [];

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "cars",
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }

            req.body.images = imagesLinks;
        }

        car = await carModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
        res.status(200).json({ success: true, car });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error " + error });

    }
}

// Delete car
const deleteCar = async (req, res) => {
    try {

        let car = await carModel.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ success: false, message: "Car Not Found" });
        }

        // Deleting Images From Cloudinary
        for (let i = 0; i < car.images.length; i++) {
            await cloudinary.v2.uploader.destroy(car.images[i].public_id);
        }

        await carModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Car Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error " + error });

    }
}

module.exports = { createCar, updateCar, deleteCar, getAllCars, getCarDetails };