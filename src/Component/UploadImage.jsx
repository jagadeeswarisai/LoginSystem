import React from 'react';
import axios from 'axios';

const UploadImage = ({ setImageUrl }) => {
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:5000/api/upload', formData)
      .then((response) => {
        setImageUrl(response.data.image_url);  // Send image URL to parent
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
      });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                   file:rounded-full file:border-0 file:text-sm file:font-semibold 
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default UploadImage;
