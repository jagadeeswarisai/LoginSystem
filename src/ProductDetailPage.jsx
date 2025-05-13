import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetailPage = () => {
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
  <div className="container mx-auto px-4 py-12">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Left: Image Section */}
      <div className="border border-gray-300 rounded-xl shadow-sm p-6 flex flex-col items-center bg-white">
        <img
          src={`https://loginsystembackendecommercesite.onrender.com/uploads/${product.image}`}
          alt={product.name}
          className="w-[400px] h-[400px] object-cover rounded-xl mb-6 transition-transform duration-300 hover:scale-105"
        />

        {/* Button Section */}
        <div className="w-full border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row gap-4 justify-center bg-gray-50">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 w-full sm:w-auto transition">
            <FaShoppingCart />
            Add to Cart
          </button>
          <button className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 w-full sm:w-auto transition">
            <FaBolt />
            Buy Now
          </button>
        </div>
      </div>

      {/* Right: Product Details Section */}
      <div className="border border-gray-300 rounded-xl shadow-sm p-6 bg-white">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <p className="text-gray-700 mb-4">{product.description}</p>

        <p className="text-gray-700 mb-2"><span className="font-semibold">Price:</span> ₹{product.price}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Weight:</span> {product.weight} kg</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Height:</span> {product.height} mm</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Width:</span> {product.width} mm</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Length:</span> {product.length} mm</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Tax:</span> {product.tax}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Status:</span> {product.status}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Warehouse:</span> {product.warehouseLocation}</p>
        <p className="text-gray-700 mb-2"><span className="font-semibold">Category:</span> {product.category}</p>
      </div>
    </div>
  </div>
);


};

export default ProductDetailPage;
