import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ISSUE #7 FIX: Full admin panel with search, filter, role badge, and admin-account guard
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState({ text: "", type: "" });

  const showMsg = (text, type = "error") => {
    setActionMsg({ text, type });
    setTimeout(() => setActionMsg({ text: "", type: "" }), 4000);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/admin/users`, {
          headers: { Authorization: token },
        });
        setUsers(res.data);
      } catch (error) {
        showMsg("Error fetching users: " + (error.response?.data?.error || error.message));
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/admin/users/${id}`, {
        headers: { Authorization: token },
      });
      setUsers(users.filter((u) => u._id !== id));
      showMsg("User deleted successfully.", "success");
    } catch (error) {
      const msg = error.response?.data?.error || "Failed to delete user.";
      showMsg(msg);
    }
  };

  const roleBadgeColor = (role) => {
    if (role === "admin") return "bg-purple-100 text-purple-800 border border-purple-300";
    if (role === "teacher") return "bg-blue-100 text-blue-800 border border-blue-300";
    return "bg-green-100 text-green-800 border border-green-300";
  };

  // Filter & search
  const filteredUsers = users.filter((u) => {
    const matchesRole = filterRole === "all" || u.role === filterRole;
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const counts = {
    total: users.length,
    student: users.filter((u) => u.role === "student").length,
    teacher: users.filter((u) => u.role === "teacher").length,
    admin: users.filter((u) => u.role === "admin").length,
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-5xl p-8">
        <h2 className="text-3xl font-bold mb-2">Admin Panel</h2>
        <p className="text-gray-500 mb-6 text-sm">Manage registered users across the platform.</p>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Users", value: counts.total, color: "bg-gray-700" },
            { label: "Students", value: counts.student, color: "bg-green-600" },
            { label: "Teachers", value: counts.teacher, color: "bg-blue-600" },
            { label: "Admins", value: counts.admin, color: "bg-purple-600" },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.color} text-white p-4 rounded-xl text-center shadow`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs font-medium mt-1 opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action Message */}
        {actionMsg.text && (
          <div
            className={`mb-4 px-4 py-3 rounded-lg font-medium text-sm ${
              actionMsg.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {actionMsg.text}
          </div>
        )}

        {/* Search + Filter Bar */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        {/* User List */}
        {loading ? (
          <p className="text-gray-500 text-center py-8">Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No users found.</p>
        ) : (
          filteredUsers.map((u) => (
            <div
              key={u._id}
              className={`bg-white p-5 mb-3 rounded-xl shadow flex justify-between items-center hover:shadow-md transition ${
                u.role === "admin" ? "border-l-4 border-purple-500" : ""
              }`}
            >
              <div>
                <p className="font-semibold text-gray-900">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${roleBadgeColor(u.role)}`}>
                  {u.role.toUpperCase()}
                </span>
              </div>

              <div className="flex gap-2 items-center">
                {/* Admin accounts are protected — no delete button */}
                {u.role === "admin" ? (
                  <span className="text-xs text-purple-600 font-semibold bg-purple-50 border border-purple-200 px-3 py-1 rounded-lg">
                    🔒 Protected Admin
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete user "${u.name}"? This cannot be undone.`)) {
                        deleteUser(u._id);
                      }
                    }}
                    className="px-4 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-600 transition text-sm font-semibold"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
