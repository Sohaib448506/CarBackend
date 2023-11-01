const { UsersModel: User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TOKEN_SECRET_KEY, TOKEN_EXPIRY } = require("../../config");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const user = new User({ email, password });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// User login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ error: "Authentication failed" });
      }

      // Create a JWT token for the user
      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        TOKEN_SECRET_KEY,
        {
          expiresIn: TOKEN_EXPIRY,
        }
      );

      res.status(200).json({
        message: "Authentication successful",
        token: token,
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
};
