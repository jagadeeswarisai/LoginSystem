import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', height: '', weight: '',
    length: '', width: '', status: 'Available', tax: '', warehouseLocation: '',
    category: '', image: null
  });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/categories');
    setCategories(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = e => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, data);
      } else {
        await axios.post('http://localhost:5000/api/products', data);
      }
      fetchProducts();
      setFormData({ name: '', description: '', price: '', height: '', weight: '', length: '', width: '', status: 'Available', tax: '', warehouseLocation: '', category: '', image: null });
      setEditId(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = product => {
    setEditId(product._id);
    setFormData({ ...product, image: null });
    setShowModal(true);
  };

  const handleDelete = async id => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      <button
        onClick={() => {
          setFormData({
            name: '', description: '', price: '', height: '', weight: '',
            length: '', width: '', status: 'Available', tax: '', warehouseLocation: '',
            category: '', image: null
          });
          setEditId(null);
          setShowModal(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add New Product
      </button>
      <div className="mt-6">
  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Image</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Price</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Category</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {products.map(product => (
          <tr key={product._id} className="hover:bg-gray-50 transition">
            <td className="px-4 py-2">
              {product.image && (
                <img
                  src={`http://localhost:5000/uploads/${product.image}`}
                  alt={product.name}
                  className="h-12 w-12 rounded object-cover"
                />
              )}
            </td>
            <td className="px-4 py-2 text-sm text-gray-800">{product.name}</td>
            <td className="px-4 py-2 text-sm text-gray-600">{product.description}</td>
            <td className="px-4 py-2 text-sm text-gray-800">₹{product.price}</td>
            <td className="px-4 py-2 text-sm">{product.status}</td>
            <td className="px-4 py-2 text-sm">{product.category}</td>
            <td className="px-4 py-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 text-xs rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 text-xs rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" required />
              <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded" required />
              <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 rounded" required />
              <input name="height" placeholder="Height" value={formData.height} onChange={handleChange} className="border p-2 rounded" />
              <input name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} className="border p-2 rounded" />
              <input name="length" placeholder="Length" value={formData.length} onChange={handleChange} className="border p-2 rounded" />
              <input name="width" placeholder="Width" value={formData.width} onChange={handleChange} className="border p-2 rounded" />
              <input name="tax" placeholder="Tax" value={formData.tax} onChange={handleChange} className="border p-2 rounded" />
              <input name="warehouseLocation" placeholder="Warehouse Location" value={formData.warehouseLocation} onChange={handleChange} className="border p-2 rounded" />

              <select name="status" value={formData.status} onChange={handleChange} className="border p-2 rounded">
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <select name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded">
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>

              <input type="file" onChange={handleImageChange} className="col-span-2" />
              <div className="col-span-2 flex justify-end gap-3 mt-3">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                  {editId ? 'Update' : 'Add'}
                </button>
                <button type="button" onClick={() => { setShowModal(false); setEditId(null); }} className="bg-gray-400 text-white px-4 py-2 rounded">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
