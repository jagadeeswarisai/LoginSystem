import React from "react";
import { FaShoppingCart, FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex flex-wrap items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600 tracking-wide">
        Happy <span className="text-gray-700">Buying</span>
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm my-3 lg:my-0">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full py-2 px-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      {/* User Icons */}
      <div className="flex items-center gap-4 mt-3 lg:mt-0">
        <Link to="/profile" className="text-gray-600 hover:text-blue-600 transition">
          <FaUser size={18} />
        </Link>
        <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition">
          <FaShoppingCart size={18} />
        </Link>
        <button className="flex items-center gap-2 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm hover:bg-red-600 transition">
          <FaSignOutAlt size={14} /> Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
