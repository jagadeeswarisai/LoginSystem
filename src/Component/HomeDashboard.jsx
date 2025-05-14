import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // To handle navigation
import axios from "axios";

const HomeDashboard = () => {
  const [electronics, setElectronics] = useState([]);
  const [homeAppliances, setHomeAppliances] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState("");       // Error state

  useEffect(() => {
    // Fetching electronics categories
    axios
      .get("https://loginsystembackendecommercesite.onrender.com/api/categories?group=Electronics")
      .then((res) => {
        setElectronics(res.data);
      })
      .catch((err) => {
        setError("Error fetching electronics categories");
      });

    // Fetching home appliances categories
    axios
      .get("https://loginsystembackendecommercesite.onrender.com/api/categories?group=Home Appliances")
      .then((res) => {
        setHomeAppliances(res.data);
        setLoading(false);  // Set loading to false when all data is fetched
      })
      .catch((err) => {
        setError("Error fetching home appliances categories");
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 text-lg">Loading categories...</p>
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
      {/* Electronics Categories */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Deals On Electronics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {electronics.length > 0 ? (
          electronics.map((cat) => (
            <Link
              key={cat._id}
              to={`/homedashboard/category/${cat.name}`} // Link to the specific category
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={cat.image ? `https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}` : "/default-category.jpg"} // Use a default image if missing
                alt={cat.name}
                className="w-40 h-40 object-cover rounded-lg mb-4 ring-2 ring-gray-300 hover:brightness-95 transition mx-auto"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">{cat.name}</h2>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No categories available.</p>
        )}
      </div>

      {/* Home Appliances Categories */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-12">Best Deals On Home Appliances</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {homeAppliances.length > 0 ? (
          homeAppliances.map((cat) => (
            <Link
              key={cat._id}
              to={`/homedashboard/category/${cat.name}`} // Link to the specific category
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={cat.image ? `https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}` : "/default-category.jpg"} // Use a default image if missing
                alt={cat.name}
                className="w-40 h-40 object-cover rounded-lg mb-4 ring-2 ring-gray-300 hover:brightness-95 transition mx-auto"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">{cat.name}</h2>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default HomeDashboard;
