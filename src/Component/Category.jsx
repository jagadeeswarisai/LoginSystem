import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: null,
    group: "", // ✅ New field
  });
  const [preview, setPreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchCategories = () => {
    axios
      .get("https://loginsystembackendecommercesite.onrender.com/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setForm({ name: "", description: "", image: null, group: "" });
    setPreview("");
    setIsEditing(false);
    setEditingId(null);
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("group", form.group); // ✅ Include group
    if (form.image && typeof form.image !== "string") {
      formData.append("image", form.image);
    }

    const url = isEditing
      ? `https://loginsystembackendecommercesite.onrender.com/api/categories/${editingId}`
      : "https://loginsystembackendecommercesite.onrender.com/api/categories";
    const method = isEditing ? axios.put : axios.post;

    method(url, formData)
      .then(() => {
        fetchCategories();
        resetForm();
      })
      .catch((err) => console.error("Save error:", err));
  };

  const handleEdit = (cat) => {
    setIsEditing(true);
    setEditingId(cat._id);
    setForm({
      name: cat.name,
      description: cat.description,
      image: cat.image,
      group: cat.group || "", // ✅ Set group in edit
    });
    setPreview(`https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://loginsystembackendecommercesite.onrender.com/api/categories/${id}`)
      .then(() => fetchCategories())
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
        <button
          onClick={() => {
            setIsEditing(false);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded transition-transform duration-300 hover:scale-105 hover:bg-blue-700"
        >
          Add New Category
        </button>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 bg-gray-900 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-2xl transform transition-all duration-300">
            <h2 className="text-xl font-semibold mb-4 text-center">
              {isEditing ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Group</label>
                <select
                  name="group"
                  value={form.group}
                  onChange={handleInputChange}
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select Group</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home Appliances">Home Appliances</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Toys">Toys</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full border p-2 rounded"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded border"
                  />
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto mt-8 bg-white shadow rounded-lg border">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-blue-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3 hidden md:table-cell">Description</th>
              <th className="px-6 py-3">Group</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-200">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <img
                      src={`https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`}
                      alt={cat.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium">{cat.name}</td>
                  <td className="px-6 py-3 text-gray-600 hidden md:table-cell">{cat.description}</td>
                  <td className="px-6 py-3">{cat.group}</td>
                  <td className="px-6 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded text-xs hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
