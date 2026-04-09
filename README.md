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
