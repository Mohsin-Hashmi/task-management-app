const User = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/**Signup API */
const signUp = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters long",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
    }
    const HASHED_PASSWORD = await bcrypt.hash(password, 10);
    const user = await User({
      name,
      email,
      password: HASHED_PASSWORD,
      isAdmin: isAdmin || false,
    });

    await user.save();
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**Login API */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist with this email",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token);
    const decoded = jwt.decode(token);
    console.log(decoded);
    return res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      token: token,
      decoded: decoded,
      user: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  signUp,
  login,
};
