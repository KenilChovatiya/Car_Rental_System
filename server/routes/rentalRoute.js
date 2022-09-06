const express = require("express");
const { bookCar, getAllRentalCars, getMyRentalCars, getSingleRentalCar, deleteRentalCar, updateRentalCarStatus } = require("../controller/rentalController");
const router = express.Router();
const {authUser, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/me", authUser, getMyRentalCars);
router.get("/rentalCars", [authUser,authorizeRoles], getAllRentalCars);
router.post("/bookCar", authUser, bookCar);
router.get("/:id", authUser, getSingleRentalCar);
router.delete("/me/:id", authUser, deleteRentalCar);
router.put("/:id", [authUser,authorizeRoles], updateRentalCarStatus);
router.delete("/:id", [authUser,authorizeRoles], deleteRentalCar);

module.exports = router;