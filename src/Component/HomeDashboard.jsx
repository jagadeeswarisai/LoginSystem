import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const HomeDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [groupedCategories, setGroupedCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://loginsystembackendecommercesite.onrender.com/api/categories")
      .then((res) => {
        const cats = res.data;
        setCategories(cats);
        setGroupedCategories(groupByGroup(cats));
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching categories");
        setLoading(false);
      });
  }, []);

  // Helper function to group categories by their 'group' field
  const groupByGroup = (cats) => {
    const grouped = {};
    cats.forEach((cat) => {
      const groupName = cat.group || "Other";
      if (!grouped[groupName]) {
        grouped[groupName] = [];
      }
      grouped[groupName].push(cat);
    });
    return grouped;
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

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen mt-10">
      {Object.entries(groupedCategories).map(([group, items]) => (
        <div key={group} className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Deals On {group}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {items.map((cat) => (
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
                <h2 className="text-xl font-bold text-gray-800 mb-1 text-center">{cat.name}</h2>
              </Link>
            ))}
          </div>
          {items.length === 0 && (
            <p className="text-center text-gray-500 col-span-full">No categories available in {group}.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default HomeDashboard;
