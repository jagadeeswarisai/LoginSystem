import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p className="p-4">Loading product...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <img
        src={`http://localhost:5000/uploads/products/${product.image}`}
        alt={product.name}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-sm text-gray-500">Category: {product.category}</p>
      <p className="text-sm text-gray-500">Status: {product.status}</p>
      <p className="text-lg text-blue-600 font-semibold">₹{product.price}</p>
    </div>
  );
}

export default ProductDetails;
