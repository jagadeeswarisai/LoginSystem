import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomeDashboard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Shop by Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat._id}`}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
          >
            {cat.image_url && (
              <img
                src={`http://localhost:5000/uploads/products/${cat.image_url}`}
                alt={cat.name}
                className="w-32 h-32 object-cover rounded mb-4"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-800">
              {cat.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeDashboard;
