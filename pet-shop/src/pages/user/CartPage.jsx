import React, { useState } from 'react';
import { PawPrint, Trash2, Plus, Minus } from 'lucide-react';

const CartPage = () => {
  // Sample cart items - replace with actual cart state/API
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Dog Food',
      price: 28.00,
      quantity: 2,
      image: 'https://via.placeholder.com/150x150?text=Premium+Dog+Food',
      category: 'Food',
      stock: 'In stock'
    },
    {
      id: 2,
      name: 'Plush Bone Toy',
      price: 12.00,
      quantity: 1,
      image: 'https://via.placeholder.com/150x150?text=Plush+Bone+Toy',
      category: 'Toys',
      stock: 'In stock'
    },
    {
      id: 3,
      name: 'Water Fountain',
      price: 49.00,
      quantity: 1,
      image: 'https://via.placeholder.com/150x150?text=Water+Fountain',
      category: 'Accessories',
      stock: 'In stock'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = shippingMethod === 'express' ? 15.00 : shippingMethod === 'standard' ? 5.00 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const discount = promoCode === 'SAVE10' ? subtotal * 0.10 : 0;
  const total = subtotal + shippingCost + tax - discount;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFBF6' }}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>Shopping Cart</h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#F0FDFA' }}>
              <svg className="w-12 h-12" style={{ color: '#14B8A6' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2" style={{ color: '#1F2937' }}>Your cart is empty</h2>
            <p className="text-sm mb-6" style={{ color: '#6B7280' }}>
              Start shopping to add items to your cart
            </p>
            <button className="px-6 py-3 rounded-lg text-white hover:opacity-90 transition-colors font-medium" style={{ backgroundColor: '#14B8A6' }}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl p-6 flex gap-6"
                  style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold mb-1" style={{ color: '#1F2937' }}>
                          {item.name}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: '#6B7280' }}>
                          {item.category}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            item.stock === 'In stock' ? 'text-green-700 bg-green-50' : 
                            item.stock === 'Low' ? 'text-orange-700 bg-orange-50' : 
                            'text-red-700 bg-red-50'
                          }`}>
                            {item.stock}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        style={{ color: '#6B7280' }}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium" style={{ color: '#374151' }}>Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                            style={{ border: '1px solid #D1D5DB', color: '#374151' }}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium" style={{ color: '#1F2937' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                            style={{ border: '1px solid #D1D5DB', color: '#374151' }}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold" style={{ color: '#1F2937' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-xs" style={{ color: '#6B7280' }}>
                            ${item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <div className="pt-4">
                <button className="flex items-center gap-2 text-sm font-medium hover:underline" style={{ color: '#14B8A6' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="rounded-xl p-6" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
                  <h2 className="text-xl font-semibold mb-6" style={{ color: '#1F2937' }}>Order Summary</h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                        style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                      />
                      <button className="px-4 py-2.5 rounded-lg text-white hover:opacity-90 transition-colors text-sm font-medium" style={{ backgroundColor: '#14B8A6' }}>
                        Apply
                      </button>
                    </div>
                    {promoCode === 'SAVE10' && (
                      <p className="text-xs mt-2" style={{ color: '#14B8A6' }}>
                        ✓ 10% discount applied!
                      </p>
                    )}
                  </div>

                  {/* Shipping Method */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Shipping Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ border: '1px solid #E5E5E5' }}>
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                          style={{ accentColor: '#14B8A6' }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: '#1F2937' }}>Standard Shipping</p>
                          <p className="text-xs" style={{ color: '#6B7280' }}>5-7 business days • $5.00</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ border: '1px solid #E5E5E5' }}>
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                          style={{ accentColor: '#14B8A6' }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: '#1F2937' }}>Express Shipping</p>
                          <p className="text-xs" style={{ color: '#6B7280' }}>2-3 business days • $15.00</p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ border: '1px solid #E5E5E5' }}>
                        <input
                          type="radio"
                          name="shipping"
                          value="pickup"
                          checked={shippingMethod === 'pickup'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4"
                          style={{ accentColor: '#14B8A6' }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: '#1F2937' }}>Store Pickup</p>
                          <p className="text-xs" style={{ color: '#6B7280' }}>Free • Available today</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: '#6B7280' }}>Subtotal</span>
                      <span style={{ color: '#1F2937' }}>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: '#14B8A6' }}>Discount</span>
                        <span style={{ color: '#14B8A6' }}>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: '#6B7280' }}>Shipping</span>
                      <span style={{ color: '#1F2937' }}>
                        {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: '#6B7280' }}>Tax</span>
                      <span style={{ color: '#1F2937' }}>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t font-semibold text-lg" style={{ borderColor: '#E5E5E5', color: '#1F2937' }}>
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full px-6 py-3 rounded-lg text-white hover:opacity-90 transition-colors font-semibold mb-4" style={{ backgroundColor: '#14B8A6' }}>
                    Proceed to Checkout
                  </button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-xs" style={{ color: '#6B7280' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 rounded-xl p-4" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
                  <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Why shop with us?</h3>
                  <div className="space-y-2">
                    {[
                      { icon: 'truck', text: 'Free shipping on orders over $50' },
                      { icon: 'shield', text: '30-day return policy' },
                      { icon: 'heart', text: 'Supporting pet adoption' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs" style={{ color: '#6B7280' }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon === 'truck' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          )}
                          {item.icon === 'shield' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          )}
                          {item.icon === 'heart' && (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          )}
                        </svg>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;