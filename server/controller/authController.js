const dotenv = require('dotenv');
dotenv.config();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");

// Register a  New user
const registerUser = async (req, res) => {
    const { password, cpassword } = req.body;

    if (password === cpassword) {
        try {
            //  Find old user 
            const oldUser = await UserModel.findOne({ username: req.body.username });
            if (oldUser)
                return res.status(400).json({ success: false, message: "User already exists" });

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crope: "scale"
            })

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            req.body.password = hashPassword;
            req.body.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
            const newUser = new UserModel(req.body);
            const user = await newUser.save();

            // Generate token
            const token = jwt.sign(
                { user: { id: user._id, role: user.role } },
                process.env.JWT_KEY,
                { expiresIn: "24h" }
            );

            res.status(200).json({ success: true, user, token });

        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.status(403).json({ success: false, message: "Password Is Not Matched" });
    }
}

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(500).json({ success: false, message: "Username or Password is not Match" });
        }

        const isMatchPassword = await bcrypt.compare(password, user.password);

        if (isMatchPassword) {
            // Generate token
            const token = jwt.sign(
                { user: { id: user._id, role: user.role } },
                process.env.JWT_KEY,
                { expiresIn: "24h" }
            );
            res.status(200).json({ success: true, user, token });
        } else {
            return res.status(500).json({ success: false, message: "Username or Password is not Match" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

module.exports = { registerUser, loginUser };