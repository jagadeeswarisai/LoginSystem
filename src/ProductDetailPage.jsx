import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
            <div className="flex justify-center items-center h-screen text-gray-600">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto bg-gray-50 shadow-md rounded-2xl p-6 sm:p-8 md:p-10 hover:scale-105 animate-scaleUp">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                       <img
  src={`https://loginsystembackendecommercesite.onrender.com/uploads/${product.image}`}
  alt={product.name}
  className="w-[400px] h-[400px] object-cover rounded-full mb-6 transition-transform duration-300 hover:scale-105 animate-scaleUp"
/>

                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                        <p className="text-gray-700 mb-4">{product.description}</p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Price:</span> ₹{product.price}
                        </p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Weight:</span> {product.weight} kg
                        </p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Height:</span> {product.height} mm (case thickness)
                        </p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Width:</span> {product.width} mm (case diameter)
                        </p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Warehouse Location:</span> {product.warehouseLocation}
                        </p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Status:</span> {product.status}
                        </p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Tax:</span> {product.tax}
                        </p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Length:</span> {product.length} mm
                        </p>

                        <p className="text-gray-700 mb-4">
                            <span className="font-bold">Category:</span> {product.category}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
