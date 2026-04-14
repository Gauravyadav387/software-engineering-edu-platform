const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "supersecret", { expiresIn: "1d" });

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found! This email does not exist in our system." });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Decide which transporter to use
    let transporter;
    let fromEmail;
    
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      // Use real email
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
      fromEmail = process.env.SMTP_USER;
    } else {
      // Use Dummy Ethereal Email for testing if .env isn't set
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      fromEmail = testAccount.user;
    }

    const mailOptions = {
      from: fromEmail,
      to: email,
      subject: "EduBridge - Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Log ethereal link if using test account
    if (!process.env.SMTP_USER) {
      console.log("Dummy Email Sent! Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    res.status(200).json({ message: "OTP sent to email successfully! (Check console if using Dummy Email)" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Failed to send OTP: " + error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP!" });
    }

    if (Date.now() > user.resetOtpExpire) {
      return res.status(400).json({ message: "OTP has expired!" });
    }

    // Hash and update the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
