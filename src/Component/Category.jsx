import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch categories from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        console.log("Categories data:", response.data);
        if (Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("Categories data is not an array.");
          setCategories([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleAddOrEditCategory = (e) => {
    e.preventDefault();

    const categoryData = {
      name: newCategory.name,
      description: newCategory.description,
      image_url: imageUrl,
    };

    if (isEditing) {
      // Update category
      axios
        .put(`http://localhost:5000/api/categories/${editingCategory._id}`, categoryData)
        .then(() => {
          setCategories((prev) =>
            prev.map((cat) =>
              cat._id === editingCategory._id ? { ...cat, ...categoryData } : cat
            )
          );
          resetForm();
        })
        .catch((error) => console.error("Edit error:", error));
    } else {
      // Add new category
      axios
        .post("http://localhost:5000/api/categories", categoryData)
        .then((response) => {
          setCategories([...categories, response.data.category]);
          resetForm();
        })
        .catch((error) => console.error("Add error:", error));
    }
  };

  // Handle delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((error) => console.error("Delete error:", error));
  };

  // Reset form for adding/editing categories
  const resetForm = () => {
    setShowModal(false);
    setIsEditing(false);
    setEditingCategory(null);
    setNewCategory({ name: "", description: "", image: null });
    setImageUrl("");
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCategory((prev) => ({ ...prev, image: file }));

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/api/upload", formData)
      .then((response) => {
        setImageUrl(response.data.image_url);
      })
      .catch((error) => {
        console.error("Image upload error:", error);
      });
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          Add New Category
        </button>
      </div>

      {/* Modal for adding/editing category */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit" : "Add"} Category
            </h2>
            <form onSubmit={handleAddOrEditCategory} className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCategory.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  value={newCategory.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-400"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block font-medium mb-1">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                {imageUrl && (
                  <img
                    src={`http://localhost:5000/${imageUrl}`}
                    alt="Preview"
                    className="mt-4 w-32 h-32 object-cover rounded border"
                  />
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold"
                  onClick={resetForm}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table to display categories */}
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost:5000/${category.image_url}`}
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium">{category.name}</td>
                  <td className="px-6 py-4">{category.description}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => {
                        setIsEditing(true);
                        setEditingCategory(category);
                        setNewCategory({
                          name: category.name,
                          description: category.description,
                          image: category.image_url,
                        });
                        setImageUrl(category.image_url);
                        setShowModal(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-xs font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center px-6 py-4 text-gray-500">
                  No categories available
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
