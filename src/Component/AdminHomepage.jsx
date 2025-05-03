import React from "react";
import { FaBox, FaListAlt, FaChartLine } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

function AdminHomepage() {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 fixed h-full">
        <h2 className="text-xl font-semibold mb-4 ml-8">Admin</h2>
        <ul>
          <li className="mb-2 flex items-center hover:bg-gray-500 hover:text-white p-2 rounded">
            <FaBox className="mr-2" />
            <Link to="category" className="hover:text-white">Category</Link>
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-500 hover:text-white p-2 rounded">
            <FaListAlt className="mr-2" />
            <Link to="product-list" className="hover:text-white">ProductList</Link>
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-500 hover:text-white p-2 rounded">
            <FaChartLine className="mr-2" />
            <Link to="performance" className="hover:text-white">Performance</Link>
          </li>
          <li className="mb-2 flex items-center hover:bg-gray-500 hover:text-white p-2 rounded">
            <FaChartLine className="mr-2" />
            <Link to="logout" className="hover:text-white">Logout</Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminHomepage;
