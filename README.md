# software-engineering-edu-platform
# A simple centralized learning platform for students to access subject-wise educational videos and for teachers to upload lectures and track reach. Software Engineering course project.
<pre> 
  # Auth Controller
  const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

// Fake DB (replace later)
let users = [];

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.json({ msg: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Error in registration" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    const token = jwt.sign(
      { email: user.email, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ msg: "Error in login" });
  }
};
</pre>
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<pre>
  # Middelware
  const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

// Verify Token
exports.verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const token = header.split(" ")[1]; // Bearer token

    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Role Check
exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
};
</pre>
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<pre>
  # Routes
  const express = require("express");
const router = express.Router();

const { register, login } = require("./AuthController");
const { verifyToken, checkRole } = require("./middleware");

// Auth Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/student", verifyToken, checkRole("student"), (req, res) => {
  res.json({ msg: "Welcome Student" });
});

router.get("/teacher", verifyToken, checkRole("teacher"), (req, res) => {
  res.json({ msg: "Welcome Teacher" });
});

module.exports = router;
</pre>
# ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
