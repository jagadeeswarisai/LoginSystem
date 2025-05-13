import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://loginsystembackendecommercesite.onrender.com/api/categories")
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Best Deals On Electronics
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {categories.length > 0 ? (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Details Div */}
              <Link to={`/homedashboard/category/${cat.name}`}>
                <div className="flex flex-col items-center">
                  <img
                    src={
                      cat.image
                        ? `https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`
                        : "/default-category.jpg"
                    }
                    alt={cat.name}
                    className="w-40 h-40 object-cover rounded-lg mb-4 ring-2 ring-gray-300 hover:brightness-95 transition"
                  />
                  <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                    {cat.name}
                  </h2>
                </div>
              </Link>

              {/* Buttons Div */}
              <div className="mt-4 flex justify-around space-x-2">
                <button className="bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center hover:bg-blue-600 transition text-sm">
                  <i className="fas fa-cart-plus mr-2"></i> Add to Cart
                </button>
                <button className="bg-green-500 text-white px-3 py-2 rounded-lg flex items-center hover:bg-green-600 transition text-sm">
                  <i className="fas fa-bolt mr-2"></i> Buy Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomeDashboard;
