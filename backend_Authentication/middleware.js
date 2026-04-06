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