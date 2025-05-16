import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', group: '', image: null });
  const [preview, setPreview] = useState('');
  const [existingImage, setExistingImage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://loginsystembackendecommercesite.onrender.com/category');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  // Handle edit button
  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      description: cat.description,
      group: cat.group || '',
      image: null,
    });
    setPreview(`https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`);
    setExistingImage(cat.image); // Save old image
    setEditingId(cat._id);
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle update
  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('group', form.group);
    formData.append('existingImage', existingImage); // Send existing image name

    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      await axios.put(
        `https://loginsystembackendecommercesite.onrender.com/category/${editingId}`,
        formData
      );
      fetchCategories();
      setShowModal(false);
      setIsEditing(false);
      setForm({ name: '', description: '', group: '', image: null });
      setPreview('');
      setExistingImage('');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category List</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat._id} className="border p-4 rounded shadow">
            <img
              src={`https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`}
              alt={cat.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{cat.name}</h2>
            <p>{cat.description}</p>
            <p className="text-sm text-gray-500">Group: {cat.group}</p>
            <button
              onClick={() => handleEdit(cat)}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Category</h2>

            <label className="block mb-2">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            />

            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            />

            <label className="block mb-2">Group</label>
            <input
              name="group"
              value={form.group}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            />

            <label className="block mb-2">Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover border"
              />
            )}

            <div className="mt-4 flex justify-between">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
