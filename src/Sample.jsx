import React, { useState, useEffect } from 'react';
import AddCategoryModal from './AddCategoryModal';

function Category() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
    setEditingCategory(null); // Ensure it's a new category if modal is opened without category data
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from backend
  const fetchCategories = async () => {
    const response = await fetch('http://localhost:5000/categories');
    const data = await response.json();
    const updatedCategories = data.map(category => ({
      ...category,
      id: category._id, // Ensure "_id" from MongoDB is mapped to "id"
    }));
    setCategories(updatedCategories);
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-category/${categoryId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setCategories(categories.filter(category => category.id !== categoryId));
        alert("Category deleted successfully");
      } else {
        const data = await response.json();
        alert(`Error deleting category: ${data.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert(`An error occurred while deleting the category: ${error.message}`);
    }
  };

  // Handle category edit (pass the category info to the modal for editing)
  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowModal(true); // Open the modal with category data
  };

  return (
    <div className="p-4 md:p-8">
      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        Add New Category
      </button>

      {/* Modal is conditionally rendered based on showModal state */}
      {showModal && (
        <AddCategoryModal
          closeModal={closeModal}
          setCategories={setCategories}
          category={editingCategory} // Pass the editing category
        />
      )}

      {/* Category Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 text-sm text-gray-700">{category.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{category.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{category.description}</td>
                <td className="px-6 py-4">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-16 h-16 rounded object-cover border"
                  />
                </td>
                <td className="px-6 py-4 space-x-2">
                  {/* Edit button */}
                  <button 
                    className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                    onClick={() => handleEditCategory(category)} // Open modal for editing category
                  >
                    Edit
                  </button>

                  {/* Delete button */}
                  <button 
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDeleteCategory(category.id)} // Delete category
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
  );
}

export default Category;

