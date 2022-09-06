const express = require("express");
const { getUserDetails, getSingleUser, getAllUser, updateUserProfile, deleteUser, updatePassword, updateUserRole } = require("../controller/userController");
const router = express.Router();
const {authUser, authorizeRoles } = require("../middleware/authMiddleware");

router.get("/me", authUser, getUserDetails);
router.get("/:id", authUser, getSingleUser);
router.put("/me/updateProfile", authUser, updateUserProfile);
router.put("/me/updatePassword", authUser, updatePassword);
router.get("/", [authUser,authorizeRoles], getAllUser);
router.delete("/:id", [authUser,authorizeRoles], deleteUser);
router.put("/:id", [authUser,authorizeRoles], updateUserRole);

module.exports = router;