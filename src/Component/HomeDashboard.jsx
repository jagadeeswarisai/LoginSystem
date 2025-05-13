import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // To handle navigation
import axios from "axios";

const HomeDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState("");       // Error state

  useEffect(() => {
    axios
      .get("https://loginsystembackendecommercesite.onrender.com/api/categories")  // Fetch categories from the backend
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching categories");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen mt-10">
  {/* Electronics Section */}
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Deals On Electronics</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-10">
    {electronics.length > 0 ? (
      electronics.map((cat) => (
        <Link
          key={cat._id}
          to={`/homedashboard/category/${cat.name}`}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <img
            src={cat.image ? `https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}` : "/default-category.jpg"}
            alt={cat.name}
            className="w-40 h-40 object-cover rounded-lg mb-4 ring-2 ring-gray-300 hover:brightness-95 transition mx-auto"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">{cat.name}</h2>
        </Link>
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">No electronics available.</p>
    )}
  </div>

  {/* Home Appliances Section */}
  <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Deals On Home Appliances</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
    {homeAppliances.length > 0 ? (
      homeAppliances.map((cat) => (
        <Link
          key={cat._id}
          to={`/homedashboard/category/${cat.name}`}
          className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
        >
          <img
            src={cat.image ? `https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}` : "/default-category.jpg"}
            alt={cat.name}
            className="w-40 h-40 object-cover rounded-lg mb-4 ring-2 ring-gray-300 hover:brightness-95 transition mx-auto"
          />
          <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">{cat.name}</h2>
        </Link>
      ))
    ) : (
      <p className="text-center text-gray-500 col-span-full">No Home appliances available.</p>
    )}
  </div>
</div>

  );
};

export default HomeDashboard;
