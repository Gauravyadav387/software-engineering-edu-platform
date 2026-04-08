import React, { useState } from "react";
import { Link } from "react-router-dom";

function Subjects() {
  const [search, setSearch] = useState("");

  const subjects = [
    { id: 1, name: "Mathematics", icon: "📐" },
    { id: 2, name: "Physics", icon: "⚛️" },
    { id: 3, name: "Computer Science", icon: "💻" }
  ];

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Select Subject</h2>

        {/* 🔍 Search Bar */}
        <div className="relative max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-0 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-all duration-200"
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <span className="text-gray-400 sm:text-sm">🔍</span>
          </div>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSubjects.map(subject => (
            <Link
              key={subject.id}
              to={`/videos/${subject.name}`}
              className="group relative flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:ring-2 hover:ring-blue-600 hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {subject.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {subject.name}
              </h3>
            </Link>
          ))}
        </div>
        
        {filteredSubjects.length === 0 && (
          <p className="mt-8 text-gray-500 italic">No subjects found matching "{search}"</p>
        )}
      </div>
    </div>
  );
}

export default Subjects;