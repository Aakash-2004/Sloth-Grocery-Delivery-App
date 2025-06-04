import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaShoppingCart, FaSpinner } from 'react-icons/fa';

const ProductList = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <FaSpinner className="animate-spin text-4xl text-emerald-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                    <div className="relative pb-[100%]">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                            {product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-emerald-600">
                                ${product.price.toFixed(2)}
                            </span>
                            <button
                                onClick={() => onAddToCart(product)}
                                className="p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors"
                                title="Add to Cart"
                            >
                                <FaShoppingCart />
                            </button>
                        </div>
                        {product.stock <= 5 && product.stock > 0 && (
                            <p className="text-sm text-orange-500 mt-2">
                                Only {product.stock} left in stock!
                            </p>
                        )}
                        {product.stock === 0 && (
                            <p className="text-sm text-red-500 mt-2">
                                Out of stock
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList; 