import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'MyUploads'; // from Cloudinary dashboard
const CLOUDINARY_CLOUD_NAME = 'dklysh3ty';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', height: '', weight: '',
    length: '', width: '', status: 'Available', tax: '', warehouseLocation: '',
    category: '', imageUrl: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get('https://loginsystembackendecommercesite.onrender.com/api/products');
    setProducts(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get('https://loginsystembackendecommercesite.onrender.com/api/categories');
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

  const handleImageChange = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // Prepare form data for Cloudinary
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      // Upload image to Cloudinary
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        data
      );

      setFormData(prev => ({ ...prev, imageUrl: res.data.secure_url }));
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      alert('Failed to upload image.');
    }
    setUploadingImage(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.imageUrl) {
      alert('Please upload an image before submitting.');
      return;
    }

    try {
      if (editId) {
        await axios.put(`https://loginsystembackendecommercesite.onrender.com/api/products/${editId}`, formData);
      } else {
        await axios.post('https://loginsystembackendecommercesite.onrender.com/api/products', formData);
      }
      fetchProducts();
      setFormData({
        name: '', description: '', price: '', height: '', weight: '',
        length: '', width: '', status: 'Available', tax: '', warehouseLocation: '',
        category: '', imageUrl: ''
      });
      setEditId(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product.');
    }
  };

  const handleEdit = product => {
    setEditId(product._id);
    setFormData({
      ...product,
      imageUrl: product.image || ''  // Adjust according to your backend field name for image URL
    });
    setShowModal(true);
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`https://loginsystembackendecommercesite.onrender.com/api/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={() => {
          setFormData({
            name: '', description: '', price: '', height: '', weight: '',
            length: '', width: '', status: 'Available', tax: '', warehouseLocation: '',
            category: '', imageUrl: ''
          });
          setEditId(null);
          setShowModal(true);
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-105 hover:bg-blue-700 animate-fadeIn"
      >
        Add New Product
      </button>

      {/* Table and products listing here (same as your original) */}
      <div className="mt-6 animate-fadeIn">
        <div className="w-full overflow-x-auto rounded-xl border border-blue-200 shadow-lg transition-all duration-500 ease-in-out hover:shadow-xl">
          <div className="max-h-[400px] overflow-y-auto">
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
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "forwards" }}
                  >
                    <td className="px-4 py-2">
                      {product.image ? (
                        <img
                          src={product.image} // Assuming your backend stores Cloudinary URL in image field
                          alt={product.name}
                          className="h-12 w-12 rounded-full object-cover transition-transform duration-300 hover:scale-110"
                        />
                      ) : (
                        'No Image'
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
              </tbody>
            </table>
          </div>
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

              {/* Image Upload */}
              <input type="file" accept="image/*" onChange={handleImageChange} className="col-span-2" />
              {uploadingImage && <p className="col-span-2 text-sm text-gray-500">Uploading image...</p>}

              {/* Preview uploaded image */}
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="col-span-2 h-32 object-contain rounded mt-2"
                />
              )}

              <div className="col-span-2 flex justify-end gap-3 mt-3">
                <button
                  type="submit"
                  disabled={uploadingImage}
                  className={`px-4 py-2 rounded text-white ${uploadingImage ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {editId ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditId(null); }}
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
