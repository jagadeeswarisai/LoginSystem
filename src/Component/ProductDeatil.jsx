import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded shadow">
      <img
        src={`http://localhost:5000/uploads/products/${product.image}`}
        alt={product.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-sm text-gray-500">Status: {product.status}</p>
      <p className="text-lg text-blue-600 font-semibold">₹{product.price}</p>
    </div>
  );
}

export default ProductDetail;
