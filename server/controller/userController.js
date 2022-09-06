const dotenv = require('dotenv');
dotenv.config();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

// get user details
const getUserDetails = async (req, res) => {
    try {
        const token = req.header('auth-token');
        const user = await UserModel.findById(req.user.id).select("-password");;
        res.status(200).json({ success: true, user, token });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error"+ error });
    }
}

// Get Single User -- Admin
const getSingleUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User Does Not Exist" });
        }
        res.status(200).json({ success: true, user });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error"+ error });
    }
}

// Get all users (Admin)
const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find().select("-password");

        if (!users) {
            return res.status(400).json({ success: false, message: "Users Does Not Exist" });
        }

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error"+ error });
    }
};

// update user profile
const updateUserProfile = async (req, res) => {
    try {

        if (req.body.avatar !== "") {
            const user = await UserModel.findById(req.user.id);
            const imageId = user.avatar.public_id;
            await cloudinary.v2.uploader.destroy(imageId);
        
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
              folder: "avatars",
              width: 150,
              crop: "scale",
            });
        
            req.body.avatar = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          }

        const user = await UserModel.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({ success: true, message: "Profile Updated Successfully" });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error"+error });
    }
}

// Update Password
const updatePassword = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id);

        const isMatchPassword = await bcrypt.compare(req.body.oldPassword, user.password);

        if (!isMatchPassword) {
            return res.status(400).json({ success: false, message: "Old password is incorrect" });
        }

        if (req.body.newPassword !== req.body.cPassword) {
            return res.status(400).json({ success: false, message: "password does not match" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.newPassword, salt);
        user.password = hashPassword;

        await user.save();

        // Generate token
        const token = jwt.sign(
            { user: {id: user._id, role: user.role} },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
        );

        res.status(200).json({ success: true, message:"Password Updated Successfully", token });

    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error"+error });
    }
}

// update User Role -- Admin
const updateUserRole = async (req, res) => {

    const user = await UserModel.findById(req.params.id);

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        );
    }

    user.role = req.body.role;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Role Updated Successfully"
    });
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(400).json({ success: false, message: "User Does Not Exist" });
        }

        res.status(200).json({ success: true, message: "User Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error"+ error });
    }
}

module.exports = { getUserDetails, getSingleUser, getAllUser, updateUserProfile, deleteUser, updatePassword, updateUserRole };
