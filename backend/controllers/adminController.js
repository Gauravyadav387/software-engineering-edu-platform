const User = require("../models/user");

// Get all users (excluding other admins' passwords)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // don't send passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user
// ISSUE #6 FIX: Prevent admins from deleting other admin accounts
exports.deleteUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Prevent deletion of admin accounts by other admins
    if (targetUser.role === "admin") {
      return res.status(403).json({ error: "Admin accounts cannot be deleted through the panel. Contact a super-admin." });
    }

    // Prevent self-deletion
    if (req.user && req.user.id === req.params.id) {
      return res.status(403).json({ error: "You cannot delete your own account." });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
