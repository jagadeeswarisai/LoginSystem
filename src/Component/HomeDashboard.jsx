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
      .catch(() => {
        setError("Error fetching categories");
        setLoading(false);
      });
  }, []);

  const groupCategories = (categories) => {
    return categories.reduce((acc, category) => {
      const group = category.group || "Others";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(category);
      return acc;
    }, {});
  };

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

  const grouped = groupCategories(categories);

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen mt-10">
      {Object.entries(grouped).map(([groupName, categoriesInGroup]) => (
        <div key={groupName} className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Best Deals on {groupName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {categoriesInGroup.length > 0 ? (
              categoriesInGroup.map((cat) => (
                <Link
                  key={cat._id}
                  to={`/homedashboard/category/${cat.name}`}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={
                      cat.image
                        ? `https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`
                        : "/default-category.jpg"
                    }
                    alt={cat.name}
                    className="w-40 h-40 object-cover rounded-lg mb-4 ring-2 ring-gray-300 hover:brightness-95 transition mx-auto"
                  />
                  <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">
                    {cat.name}
                  </h2>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No categories available in this group.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeDashboard;
