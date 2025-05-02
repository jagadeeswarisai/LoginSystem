import React, { useState, useEffect } from 'react';

function AddCategoryModal({ closeModal, setCategories, category }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // Set initial values if editing an existing category
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      // Editing mode: no need to prefill image input
    } else {
      setName('');
      setDescription('');
      setImage(null);
    }
  }, [category]);

  // Handle image input change
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
  
    try {
      if (category && category.id) {
        const categoryData = {
          name,
          description,
          image_url: category.image_url, // Use existing image if no new image provided
        };
  
        if (image) {
          categoryData.image_url = await uploadImage(image);
        }
  
        response = await fetch(`http://localhost:5000/categories/${category.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });
      } else {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        if (image) {
          formData.append('image', image);
        }
  
        response = await fetch('http://localhost:5000/categories', {
          method: 'POST',
          body: formData,
        });
      }
  
      const data = await response.json();
  
      if (response.ok) {
        if (category) {
          setCategories((prev) =>
            prev.map((cat) => (cat.id === data.id ? data : cat))
          );
          alert('Category updated successfully!');
        } else {
          setCategories((prev) => [...prev, data.category]);
          alert('Category added successfully!');
        }
        closeModal();
      } else {
        alert(data.error || 'Failed to save category.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while saving the category.');
    }
  };
  
  // Utility function to handle image upload separately
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('http://localhost:5000/upload-image', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      return data.image_url;
    } else {
      throw new Error('Image upload failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center  z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">
          {category ? 'Edit Category' : 'Add Category'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {category ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal;
