import React, { useState } from 'react';
import axios from 'axios';

const ProductUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.status === "success") {
        setImageUrl(response.data.image_url);
        alert("File uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <div>
      <h1>Upload Product Image</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <p>Image Uploaded:</p>
          <img src={imageUrl} alt="Product" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default ProductUpload;
