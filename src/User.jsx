import React, { useEffect, useState } from "react";

function UserProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data));
  }, []);

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat ? cat.name : "Unknown";
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p._id} className="border rounded-lg shadow p-4">
          <img
            src={`http://localhost:5000/uploads/products/${p.image}`}
            alt={p.name}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
          <p className="text-gray-600 mb-2">{p.description}</p>
          <p className="text-sm text-gray-500">Category: {getCategoryName(p.category)}</p>
          <p className="text-sm text-gray-500">Status: {p.status}</p>
          <p className="text-lg text-blue-600 font-semibold">₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

export default UserProductList;
