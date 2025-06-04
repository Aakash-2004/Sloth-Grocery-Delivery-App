import React, { useState } from 'react';
import ProductList from '../components/products/ProductList';
import CartModal from '../components/CartModal';

const Products = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const handleAddToCart = (product) => {
        setCartItems(prevItems => {
            // Check if product already exists in cart
            const existingItem = prevItems.find(item => item._id === product._id);
            
            if (existingItem) {
                // If product exists and stock allows, increment quantity
                if (existingItem.quantity < product.stock) {
                    return prevItems.map(item =>
                        item._id === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return prevItems; // Don't add if stock limit reached
            }
            
            // If product doesn't exist in cart, add it with quantity 1
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item._id === productId) {
                    // Ensure quantity doesn't exceed stock
                    const quantity = Math.min(newQuantity, item.stock);
                    return { ...item, quantity };
                }
                return item;
            })
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Our Products</h1>
                <ProductList onAddToCart={handleAddToCart} />
            </div>

            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cartItems}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
            />
        </div>
    );
};

export default Products; 