import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Use useParams to get the category name
import axios from "axios";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Extract category name from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products?category=${categoryName}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [categoryName]); // Fetch products whenever the category changes

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{categoryName}Product</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {products.length > 0 ? (
  products.map((product) => (
    <Link to={`/homedashboard/product/${product._id}`} key={product._id}>
      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
        <img
          src={`http://localhost:5000/uploads/${product.image}`}
          alt={product.name}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-lg font-bold">₹{product.price}</p>
      </div>
    </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
