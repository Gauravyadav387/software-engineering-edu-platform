import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/admin/users`, {
          headers: { Authorization: token },
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users", error);
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
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Failed to delete user");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">


      <div className="w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold mb-6">Admin Panel: User Management</h2>

        {/* User List */}
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          users.map((u) => (
            <div
              key={u._id}
              className="bg-white p-5 mb-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
            >
              <div>
                <p className="font-semibold text-lg">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email} &bull; <span className="uppercase font-bold">{u.role}</span></p>
              </div>

              <button
                onClick={() => {
                  if(window.confirm("Are you sure you want to delete this user?")) {
                    deleteUser(u._id)
                  }
                }}
                className="px-4 py-1 rounded text-white bg-red-500 hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
