import { useEffect, useState } from "react";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("student");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(data);
  }, []);

  const save = (data) => {
    setUsers(data);
    localStorage.setItem("users", JSON.stringify(data));
  };

  const addUser = () => {
    if (!name) return alert("Enter name");

    const newUser = {
      id: Date.now(),
      name,
      role,
      active: true,
    };

    save([...users, newUser]);
    setName("");
  };

  const toggle = (id) => {
    const updated = users.map((u) =>
      u.id === id ? { ...u, active: !u.active } : u
    );
    save(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl p-8">

        <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>

        {/* Add User */}
        <div className="bg-white p-5 rounded-xl shadow mb-6 flex gap-3">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="border p-2 rounded w-full"
          />

          <select
            className="border p-2 rounded"
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button
            onClick={addUser}
            className="bg-blue-600 text-white px-5 rounded"
          >
            Add
          </button>

        </div>

        {/* User List */}
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-5 mb-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-500">{u.role}</p>
            </div>

            <button
              onClick={() => toggle(u.id)}
              className={`px-4 py-1 rounded text-white ${
                u.active ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {u.active ? "Active" : "Inactive"}
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminPanel;