import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access the category name from the URL
import axios from "axios";

const EarbutsDetailPage = () => {
  const { categoryName } = useParams(); // Get category name (e.g., "Phone")
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch products by category name
    if (categoryName) {
      setLoading(true);
      setError(null);

      axios
        .get(`https://loginsystembackendecommercesite.onrender.com/api/products?category=${categoryName}`)
        .then((res) => {
          setProducts(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Error fetching products.");
          setLoading(false);
        });
    }
  }, [categoryName]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{categoryName} Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={product.image ? `https://loginsystembackendecommercesite.onrender.com/uploads/${product.image}` : "/default-image.jpg"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-lg font-bold">₹{product.price}</p>
              <p className="text-sm text-gray-600">{product.status}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default EarbutsDetailPage;
