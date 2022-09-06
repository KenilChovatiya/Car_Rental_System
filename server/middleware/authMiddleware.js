const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ success: false, error: "Please aunthenticate using valid token" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_KEY);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, error: "Please aunthenticate using valid token" });
    }

}

const authorizeRoles = (req, res, next) => {
        try {
            if (req.user.role !== "admin") {
                return res.status(401).json({ success: false, error: `Role: ${req.user.role} is not allowed to access this resouce ` });
            }
            next();
        } catch (error) {
            console.log(error);
        }
};

module.exports = { authUser, authorizeRoles };