import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaBolt } from "react-icons/fa";

const HomeDashboard = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`https://loginsystembackendecommercesite.onrender.com/api/products/${productId}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error("Error fetching product details:", err);
        alert("Unable to fetch product details. Please try again later.");
      });
  }, [productId]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left: Image Box */}
        <div className="w-full lg:w-1/3 border border-gray-200 rounded-xl p-4 shadow-md bg-white">
          <img
            src={`https://loginsystembackendecommercesite.onrender.com/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-auto max-h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* Center: Product Details */}
        <div className="w-full lg:w-1/3 border border-gray-200 rounded-xl p-6 shadow-md bg-white">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
            <p><span className="font-bold">Price:</span> ₹{product.price}</p>
            <p><span className="font-bold">Weight:</span> {product.weight} kg</p>
            <p><span className="font-bold">Height:</span> {product.height} mm</p>
            <p><span className="font-bold">Width:</span> {product.width} mm</p>
            <p><span className="font-bold">Length:</span> {product.length} mm</p>
            <p><span className="font-bold">Tax:</span> {product.tax}</p>
            <p><span className="font-bold">Status:</span> {product.status}</p>
            <p><span className="font-bold">Warehouse:</span> {product.warehouseLocation}</p>
            <p><span className="font-bold">Category:</span> {product.category}</p>
          </div>
        </div>

        {/* Right: Buttons Box */}
        <div className="w-full lg:w-1/3 border border-gray-200 rounded-xl p-6 shadow-md bg-white flex flex-col justify-center items-center gap-4">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full">
            <FaShoppingCart /> Add to Cart
          </button>
          <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full">
            <FaBolt /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
