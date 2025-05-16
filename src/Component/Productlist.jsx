import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DEFAULT_FORM = {
  name: '',
  description: '',
  price: '',
  height: '',
  weight: '',
  length: '',
  width: '',
  status: 'Available',
  tax: '',
  warehouseLocation: '',
  category: '',
  image: null,
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(DEFAULT_FORM);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('https://loginsystembackendecommercesite.onrender.com/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('https://loginsystembackendecommercesite.onrender.com/api/categories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle text/select input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  // Submit form (Add or Edit product)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => data.append(key, val));

      if (editId) {
        await axios.put(`https://loginsystembackendecommercesite.onrender.com/api/products/${editId}`, data);
      } else {
        await axios.post('https://loginsystembackendecommercesite.onrender.com/api/products', data);
      }

      await fetchProducts();
      closeModal();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Open modal for editing a product
  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({ ...product, image: null }); // Reset image input on edit
    setShowModal(true);
  };

  // Delete a product
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`https://loginsystembackendecommercesite.onrender.com/api/products/${id}`);
      await fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form and close modal
  const closeModal = () => {
    setFormData(DEFAULT_FORM);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <button
        onClick={() => {
          setFormData(DEFAULT_FORM);
          setEditId(null);
          setShowModal(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-105 hover:bg-blue-700 animate-fadeIn"
      >
        Add New Product
      </button>

      {/* Products Table */}
      <div className="mt-6 animate-fadeIn">
        <div className="w-full overflow-x-auto rounded-xl border border-blue-200 shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl">
          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <p className="p-4 text-center text-gray-600">Loading...</p>
            ) : (
              <table className="min-w-[800px] w-full divide-y divide-gray-200 transition-transform duration-500 ease-in-out">
                <thead className="bg-blue-100 uppercase text-xs sticky top-0 z-10">
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
                <tbody className="divide-y divide-blue-200 bg-white">
                  {products.map((product, index) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 transition duration-300 ease-in-out animate-fadeIn"
                      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                    >
                      <td className="px-4 py-2">
                        {product.image && (
                          <img
                            src={`https://loginsystembackendecommercesite.onrender.com/uploads/${product.image}`}
                            alt={product.name}
                            className="h-12 w-12 rounded-full object-cover transition-transform duration-300 hover:scale-110"
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
                          className="bg-yellow-500 text-white px-3 py-1 text-xs rounded mr-2 hover:bg-yellow-600 transition-colors duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 transition-colors duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-gray-500">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                name="price"
                placeholder="Price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                className="border p-2 rounded"
                required
                min="0"
                step="0.01"
              />
              <input
                name="height"
                placeholder="Height"
                value={formData.height}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="weight"
                placeholder="Weight"
                value={formData.weight}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="length"
                placeholder="Length"
                value={formData.length}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="width"
                placeholder="Width"
                value={formData.width}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="tax"
                placeholder="Tax"
                value={formData.tax}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                name="warehouseLocation"
                placeholder="Warehouse Location"
                value={formData.warehouseLocation}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input type="file" onChange={handleImageChange} className="col-span-2" />

              <div className="col-span-2 flex justify-end gap-3 mt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  {editId ? (loading ? 'Updating...' : 'Update') : loading ? 'Adding...' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
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
