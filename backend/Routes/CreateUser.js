const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { body, validationResult } = require("express-validator");

const jwtSecret = "IamLord#$#";
router.post(
  "/createuser",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .trim(),
    body("geolocation").notEmpty().withMessage("Address is required").trim(),
    body("securityAnswer")
      .notEmpty()
      .withMessage("Security Answer is required")
      .trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "User with this email already exists" }],
        });
      }

      await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        location: req.body.geolocation,
        securityAnswer: req.body.securityAnswer,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: [{ msg: "Server error" }] });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      let userData = await User.findOne({ email: req.body.email });
      if (!userData) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "Try logging in with correct credentials" }],
        });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      // Fixed password comparison logic
      if (!pwdCompare) {
        return res.status(400).json({
          success: false,
          errors: [{ msg: "Try logging in with correct credentials" }],
        });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);
      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: [{ msg: "Server error" }] });
    }
  }
);

router.post(
  "/resetpassword",
  [
    body("email").isEmail().withMessage("Enter a valid email"),
    body("securityAnswer").notEmpty().withMessage("Security answer is required"),
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }

      if (user.securityAnswer !== req.body.securityAnswer) {
        return res
          .status(400)
          .json({ success: false, message: "Incorrect security answer" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.newPassword, salt);

      await User.findOneAndUpdate(
        { email: req.body.email },
        { password: secPass }
      );

      res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
);

module.exports = router;
