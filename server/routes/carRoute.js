const express = require("express");
const { createCar, updateCar, deleteCar, getAllCars, getCarDetails } = require("../controller/carController");
const router = express.Router();
const {authUser, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/cars", getAllCars);
router.post("/new", [authUser,authorizeRoles], createCar);
router.get("/:id", getCarDetails);
router.put("/:id", [authUser, authorizeRoles], updateCar);
router.delete("/:id", [authUser,authorizeRoles], deleteCar);
module.exports = router;
