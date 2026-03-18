const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = "mysecretkey";

// 👉 Fake database (for simplicity)
let users = [];

/* ==============================
   1. REGISTER API
================================ */
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
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
});


/* ==============================
   2. LOGIN API
================================ */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password" });
    }

    // create JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ msg: "Error in login" });
  }
});


/* ==============================
   3. TOKEN VALIDATION MIDDLEWARE
================================ */
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
}


/* ==============================
   4. ROLE-BASED ACCESS (RBAC)
================================ */
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ msg: "Access denied" });
    }
    next();
  };
}


/* ==============================
   5. PROTECTED ROUTES
================================ */

// Only Student
app.get("/student", verifyToken, checkRole("student"), (req, res) => {
  res.json({ msg: "Welcome Student" });
});

// Only Teacher
app.get("/teacher", verifyToken, checkRole("teacher"), (req, res) => {
  res.json({ msg: "Welcome Teacher" });
});


/* ==============================
   SERVER START
================================ */
app.listen(5000, () => {
  console.log("Server running on port 5000");
});