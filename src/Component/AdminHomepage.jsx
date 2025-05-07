import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBox, FaListAlt, FaChartLine } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

function AdminHomepage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth info if needed
    localStorage.removeItem("token");
    // Navigate to /page
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 fixed h-full transform transition-transform duration-500 ease-in-out animate-slideInLeft shadow-lg">
        <h2 className="text-xl font-bold mb-6 ml-4 tracking-wide">Admin Panel</h2>
        <ul className="space-y-3">
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-3 rounded-md transition duration-300 ease-in-out">
            <FaBox />
            <Link to="category" className="hover:text-blue-300">Category</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-3 rounded-md transition duration-300 ease-in-out">
            <FaListAlt />
            <Link to="product-list" className="hover:text-blue-300">Product List</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-3 rounded-md transition duration-300 ease-in-out">
            <FaChartLine />
            <Link to="performance" className="hover:text-blue-300">Performance</Link>
          </li>
          <li className="flex items-center space-x-2 hover:bg-gray-700 p-3 rounded-md transition duration-300 ease-in-out cursor-pointer" onClick={handleLogout}>
            <FaChartLine />
            <span className="hover:text-red-400">Logout</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 animate-fadeIn transition-opacity duration-700">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHomepage;
