import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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

  // Group products by category
  const groupProductsByCategory = (category) => {
    return products.filter(product => product.category === category);
  };

  return (
    <div className="p-6">
      {/* Electronics Category */}
      <div>
        <h2 className="text-xl font-bold">Best Deals On Electronics</h2>
        {groupProductsByCategory('Electronics').map((product) => (
          <div key={product._id} className="border p-4 rounded mb-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>

      {/* Home Appliances Category */}
      <div>
        <h2 className="text-xl font-bold">Best Deals On Home Appliances</h2>
        {groupProductsByCategory('Home Appliances').map((product) => (
          <div key={product._id} className="border p-4 rounded mb-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.description}</p>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
      
      {/* About Us Section */}
      <div>
        <h2 className="text-xl font-bold">About</h2>
        <p>About Us content goes here...</p>
      </div>

      {/* Contact Us Section */}
      <div>
        <h2 className="text-xl font-bold">Contact Us</h2>
        <p>Contact info goes here...</p>
      </div>

      {/* Other Sections */}
      <div>
        <h2 className="text-xl font-bold">Other Information</h2>
        <ul>
          <li>Careers</li>
          <li>Flipkart Stories</li>
          <li>Press</li>
          <li>Corporate Info</li>
          <li>Group Companies</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
