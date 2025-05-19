import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa"; // Importing icons

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios
            .get(`https://loginsystembackendecommercesite.onrender.com/api/products/${productId}`)
            .then((res) => setProduct(res.data))
            .catch((err) => {
                console.error("Error fetching product details:", err);
                alert("Unable to fetch product details. Please try again later.");
            });
    }, [productId]);

    if (!product) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
       
      </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-gray-50 shadow-md rounded-2xl p-6 sm:p-8 md:p-10 hover:scale-105 animate-scaleUp">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Image Section */}
                    <div className="md:w-1/2">
                        <img
                            src={`https://loginsystembackendecommercesite.onrender.com/uploads/${product.image}`}
                            alt={product.name}
                            className="w-[400px] h-[400px] object-cover rounded-full mb-6 transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Description Section */}
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>

                        <p className="text-gray-700 mb-2"><span className="font-bold">Price:</span> ₹{product.price}</p>
                        <p className="text-gray-700 mb-2"><span className="font-bold">Weight:</span> {product.weight} kg</p>
                        <p className="text-gray-700 mb-2"><span className="font-bold">Height:</span> {product.height} mm</p>
                        <p className="text-gray-700 mb-2"><span className="font-bold">Width:</span> {product.width} mm</p>
                        <p className="text-gray-700 mb-2"><span className="font-bold">Length:</span> {product.length} mm</p>
                        <p className="text-gray-700 mb-2"><span className="font-bold">Warehouse Location:</span> {product.warehouseLocation}</p>
                        <p className="text-gray-700 mb-2"><span className="font-bold">Status:</span> {product.status}</p>
                        <p className="text-gray-700 mb-2"><span className="font-bold">Tax:</span> {product.tax}</p>
                        <p className="text-gray-700 mb-4"><span className="font-bold">Category:</span> {product.category}</p>

                        {/* Buttons Section */}
                        <div className="flex gap-4 mt-6">
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-300">
                                <FaShoppingCart />
                                Add to Cart
                            </button>
                            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition-colors duration-300">
                                <FaMoneyBillWave />
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
