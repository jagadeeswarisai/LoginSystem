import React, { useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import user from "../assets/images/user.jpg";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { TbArrowRoundaboutLeft, TbBrandBlogger } from "react-icons/tb";
import { MdOutlineContactless } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";

function HomeDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-40">
        <div className="flex items-center space-x-4 mb-8 mt-6 ml-4">
          <img
            src={user}
            alt="User"
            className="w-15 h-15 object-cover rounded-full shadow"
          />
          <span className="text-gray-700 text-sm font-semibold">
            Janet <br /> Williams
          </span>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-between w-60 ml-2 py-2 px-4 bg-blue-100 text-gray-800 rounded-lg hover:bg-blue-200 transition duration-200"
          >
            Main <FaChevronDown className="ml-2" />
          </button>

          {isDropdownOpen && (
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  to="home"
                  className="flex items-center w-60 ml-2 gap-2 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
                >
                  <AiOutlineHome /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="about"
                  className="flex items-center w-60 ml-2 gap-2 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
                >
                  <TbArrowRoundaboutLeft /> About
                </Link>
              </li>
              <li>
                <Link
                  to="contact"
                  className="flex items-center w-60 ml-2 gap-2 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
                >
                  <MdOutlineContactless /> Contact
                </Link>
              </li>
              <li>
                <Link
                  to="blog"
                  className="flex items-center w-60 ml-2 gap-2 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
                >
                  <TbBrandBlogger /> Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="offers"
                  className="flex items-center w-60 ml-2 gap-2 px-4 py-2 rounded-lg hover:bg-blue-100 text-gray-700"
                >
                  <BiSolidOffer /> Offers
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-60 ml-2 gap-2 px-4 py-2  rounded-lg hover:bg-red-100 text-red-600"
                >
                  <CiLogout /> Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6 overflow-y-auto w-full">

        <Outlet />
      </main>
    </div>
  );
}

export default HomeDashboard;
