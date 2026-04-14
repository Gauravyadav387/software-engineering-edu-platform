import React, { useEffect, useState } from "react";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_URL}/api/analytics`, {
          headers: { Authorization: token },
        });
        setAnalytics(res.data);
      } catch (error) {
        console.error("Error fetching analytics", error);
      }
    };
    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-4xl px-8 relative mb-6 flex flex-col">
        <button onClick={() => navigate("/teacher/dashboard")} className="mb-4 text-blue-600 hover:underline w-max">&larr; Back to Dashboard</button>
        <h2 className="text-3xl font-bold mb-6">Analytics</h2>

        {analytics.length === 0 && (
          <p className="text-gray-500">No analytics data available</p>
        )}

        {analytics.map((v, i) => (
          <div
            key={i}
            className="bg-white p-5 mb-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <span className="font-medium">{v.title}</span>
            <span className="text-blue-600 font-semibold text-xl">
              <span className="mr-2">👁</span> {v.views}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
