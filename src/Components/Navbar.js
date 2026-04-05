import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-blue-600 text-white px-12 py-4 flex justify-between items-center shadow-lg">
      <h1 className="font-bold text-lg">EduBridge</h1>

      <div className="flex gap-8">
        <Link to="/" className="hover:text-gray-200">Dashboard</Link>
        <Link to="/upload" className="hover:text-gray-200">Upload</Link>
        <Link to="/manage" className="hover:text-gray-200">Manage</Link>
        <Link to="/analytics" className="hover:text-gray-200">Analytics</Link>
        <Link to="/admin" className="hover:text-gray-200">Admin</Link>
      </div>
    </div>
  );
};

export default Navbar;