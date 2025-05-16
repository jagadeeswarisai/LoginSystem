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

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://loginsystembackendecommercesite.onrender.com/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const resetForm = () => {
    setForm({ name: "", description: "", group: "", image: null });
    setPreview("");
    setIsEditing(false);
    setEditingId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("group", form.group);

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    try {
      if (isEditing) {
        await axios.put(
          `https://loginsystembackendecommercesite.onrender.com/api/categories/${editingId}`,
          formData
        );
        alert("Category updated successfully");
      } else {
        await axios.post("https://loginsystembackendecommercesite.onrender.com/api/categories", formData);
        alert("Category added successfully");
      }

      fetchCategories();
      resetForm();
    } catch (error) {
      alert("Error submitting form");
    }
  };

  const handleEdit = (cat) => {
    setForm({
      name: cat.name,
      description: cat.description,
      group: cat.group || "",
      image: null,
    });
    setPreview(`https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`);
    setEditingId(cat._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`https://loginsystembackendecommercesite.onrender.com/api/categories/${id}`);
        setCategories(categories.filter((cat) => cat._id !== id));
        alert("Category deleted");
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  const groupByGroup = (categories) => {
    return categories.reduce((acc, category) => {
      const key = category.group || "Others";
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(category);
      return acc;
    }, {});
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
                <label className="block font-medium">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
              <div className="mb-3">
                <label className="block font-medium">Group</label>
                <select
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
                {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover mt-2 rounded" />}
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
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grouped Category Tables */}
      <div className="mt-10">
        {Object.entries(groupByGroup(categories)).map(([groupName, groupCategories]) => (
          <div key={groupName} className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Best Deals on {groupName}</h2>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full table-auto border border-gray-300 shadow-lg rounded-lg transition duration-300 ease-in-out">
                <thead className="bg-gray-100 sticky top-0 z-10 shadow-md">
                  <tr>
                    <th className="p-2 border">Image</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Description</th>
                    <th className="p-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupCategories.map((cat) => (
                    <tr key={cat._id} className="text-center hover:bg-blue-50 transition duration-300 ease-in-out">
                      <td className="p-2 border">
                        {cat.image ? (
                          <img
                            src={`https://loginsystembackendecommercesite.onrender.com/uploads/${cat.image}`}
                            alt={cat.name}
                            className="w-16 h-16 object-cover mx-auto rounded"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No Image</span>
                        )}
                      </td>
                      <td className="p-2 border">{cat.name}</td>
                      <td className="p-2 border">{cat.description}</td>
                      <td className="p-2 border">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {groupCategories.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-4 text-center text-gray-500">
                        No categories in this group.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
