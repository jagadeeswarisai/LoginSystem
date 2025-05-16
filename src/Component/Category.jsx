import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    group: "",
    image: null,
  });
  const [preview, setPreview] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    axios
      .get("https://loginsystembackendecommercesite.onrender.com/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageChanged(true);
    setForm((prev) => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  // Reset form
  const resetForm = () => {
    setForm({ name: "", description: "", group: "", image: null });
    setPreview("");
    setIsEditing(false);
    setEditingId(null);
    setImageChanged(false);
    setShowModal(false);
  };

  // Submit form (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("group", form.group);

    if (imageChanged || !isEditing) {
      formData.append("image", form.image);
    }

    try {
      if (isEditing) {
        // Edit category
        const res = await axios.put(
          `https://loginsystembackendecommercesite.onrender.com/api/categories/${editingId}`,
          formData
        );

        // Update the category in local state
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === editingId ? res.data : cat
          )
        );

        alert("Category updated successfully");
      } else {
        // Add new category
        const res = await axios.post(
          "https://loginsystembackendecommercesite.onrender.com/api/categories",
          formData
        );

        // Add new category to local state
        setCategories((prevCategories) => [...prevCategories, res.data]);

        alert("Category added successfully");
      }

      resetForm();
    } catch (error) {
      alert(error.response?.data?.message || "Error submitting form");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit: fill form and open modal
  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      description: cat.description,
      group: cat.group || "",
      image: null, // reset image file input on edit, use preview to show old image
    });
    setPreview(`https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`);
    setEditingId(cat._id);
    setIsEditing(true);
    setImageChanged(false);
    setShowModal(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`https://loginsystembackendecommercesite.onrender.com/api/categories/${id}`);

        // Remove category from local state
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat._id !== id)
        );

        alert("Category deleted");
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700"
      >
        Add New Category
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold mb-4">{isEditing ? "Edit Category" : "Add Category"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="block font-medium">Category Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="block font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="group" className="block font-medium">Group</label>
                <select
                  id="group"
                  name="group"
                  value={form.group}
                  onChange={handleInputChange}
                  required
                  className="w-full border p-2 rounded"
                >
                  <option value="" disabled>Select a group</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home Appliances">Home Appliances</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="block font-medium">Image</label>
                <input type="file" onChange={handleImageChange} accept="image/*" />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 object-cover mt-2"
                  />
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-4 py-2 rounded text-white ${isLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Group</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id} className="text-center">
                  <td className="p-2 border">
                    <img
                      src={`https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`}
                      alt={cat.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="p-2 border">{cat.name}</td>
                  <td className="p-2 border">{cat.description}</td>
                  <td className="p-2 border">{cat.group}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
