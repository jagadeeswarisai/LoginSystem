import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`https://loginsystembackendecommercesite.onrender.com/api/products?category=${categoryName}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError(true);
        setLoading(false);
      });
  }, [categoryName]);

  const formatCategory = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <Link to="/homedashboard" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Home
      </Link>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">{formatCategory(categoryName)} Products</h2>

      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      ) : error ? (
        <p className="text-center text-red-500 col-span-full">
          Error loading products. Please try again later.
        </p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500 col-span-full">
          No products available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {products.map((product) => (
            <Link to={`/homedashboard/product/${product._id}`} key={product._id}>
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <img
                  src={product.image} // Cloudinary URL from backend
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                <p className="text-lg font-bold">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
