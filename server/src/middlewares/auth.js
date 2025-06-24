const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/users");
dotenv.config();

/** Middleware for user authentication */
const authMiddleware = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    console.log("token is : ",token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to access this resource",
      });
    }
    const isValidToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (!isValidToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid token, please Login again",
      });
    }
    const { _id, isAdmin } = isValidToken;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    req.user = { _id, isAdmin };
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User authentication failed, please try again",
    });
  }
};

/** Middleware to check if user is admin */
const adminMiddleware = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Access denied, Admins only",
    });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
