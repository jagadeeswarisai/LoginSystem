import React, { useState, useEffect } from "react";

function ProductList() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    status: "",
    image: null,
    warehouseLocation: "",
    weight: "",
    height: "",
    length: "",
    variant: "",
    tax: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Product fetch error:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      status: "",
      image: null,
      warehouseLocation: "",
      weight: "",
      height: "",
      length: "",
      variant: "",
      tax: "",
    });
    setPreviewImage(null);
    setEditingProductId(null);
    setShowModal(false);
  };

  const handleAddOrEditProduct = async () => {
    const method = editingProductId ? "PUT" : "POST";
    const url = editingProductId
      ? `http://localhost:5000/api/products/${editingProductId}`
      : "http://localhost:5000/api/products";

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image" && !value) return;
      data.append(key, value);
    });

    try {
      const response = await fetch(url, {
        method,
        body: data,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Something went wrong");
      }

      await response.json();
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Save error:", error.message);
    }
  };

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      status: product.status,
      warehouseLocation: product.warehouseLocation || "",
      weight: product.weight || "",
      height: product.height || "",
      length: product.length || "",
      variant: product.variant || "",
      tax: product.tax || "",
      image: null,
    });
    setPreviewImage(`http://localhost:5000/uploads/products/${product.image}`);
    setEditingProductId(product._id);
    setShowModal(true);
  };

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setProducts(products.filter((p) => p._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Product List</h1>

      <button
        onClick={() => setShowModal(true)}
        className="mb-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow"
      >
        Add Product
      </button>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="min-w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Variant</th>
              <th className="px-4 py-3">Tax (%)</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.description}</td>
                <td className="px-4 py-2">₹{p.price}</td>
                <td className="px-4 py-2">{categories.find((c) => c._id === p.category)?.name || "Unknown"}</td>
                <td className="px-4 py-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${p.status === "Available" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{p.status}</span>
                </td>
                <td className="px-4 py-2">{p.variant}</td>
                <td className="px-4 py-2">{p.tax}</td>
                <td className="px-4 py-2">
                  {p.image && <img src={`http://localhost:5000/uploads/products/${p.image}`} alt="product" className="w-12 h-12 object-cover rounded border" />}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEditProduct(p)}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(p._id)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={resetForm} className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-red-600">&times;</button>

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {editingProductId ? "Edit Product" : "Add Product"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["name", "description", "price", "variant", "tax", "warehouseLocation", "weight", "height", "length"].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  placeholder={field.replace(/([A-Z])/g, ' $1')}
                  className="input-style"
                />
              ))}

              <select name="category" value={formData.category} onChange={handleInputChange} className="input-style">
                <option value="">Select Category</option>
                {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>

              <select name="status" value={formData.status} onChange={handleInputChange} className="input-style">
                <option value="">Select Status</option>
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <input type="file" name="image" onChange={handleInputChange} className="input-style" />
            </div>

            {previewImage && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover border rounded" />
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={resetForm}
                className="px-5 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditProduct}
                className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
              >
                {editingProductId ? "Save Changes" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList; 

