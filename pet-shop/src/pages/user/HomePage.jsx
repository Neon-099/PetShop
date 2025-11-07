import React from 'react';
import {useState, useEffect} from 'react';
import Navbar from '../../components/user/Navbar.jsx';
import { products } from '../../utils/products';
import { cart } from '../../utils/cart';

import ShopPage from './ShopPage';
import AdoptPage from './AdoptPage';
import DonatePage from './DonatePage';
import CartPage from './CartPage';

const HomePage = () => {
  const [activeMenu, setActiveMenu] = useState('Home');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (activeMenu === 'Home') {
      fetchFeaturedProducts();
      loadCart();
    }
  }, [activeMenu]);

  const loadCart = () => {
    setCartItems(cart.getItems());
  };

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      // Fetch featured products (active products, limited to 5)
      const response = await products.getAll({
        page: 1,
        per_page: 5,
        is_active: 1
      });
      
      const data = response.products || response.data || response;
      const items = Array.isArray(data) ? data : (data.items || []);
      console.log("items: ", items);
      // Split into featured (first 2) and new (next 3)
      setFeaturedProducts(items.slice(0, 2));
      setNewProducts(items.slice(0, 5));
      
    } catch (error) {
      console.error('Error fetching products:', error);
      setFeaturedProducts([]);
      setNewProducts([]);
    } finally {
      setLoading(false);
    }
  };
  console.log("newProducts: ", newProducts);
  const handleAddToCart = (product) => {
    if (product.quantity <= 0) {
      alert('Product is out of stock');
      return;
    }
    cart.addItem(product, 1);
    loadCart();
    alert(`${product.name} added to cart!`);
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    if (quantity < 10) return { text: 'Low Stock', color: 'text-orange-600 bg-orange-50' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-50' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} />

      {activeMenu === 'Home' && (
      <div>
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-12">
            {/* Left Section: Featured Pet/Product */}
            {loading ? (
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 min-h-[400px] flex items-center justify-center">
                <p className="text-white">Loading...</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="relative rounded-2xl overflow-hidden bg-gray-40 min-h-[400px] flex flex-col justify-between p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-40 to-gray-900 opacity-90"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-gray-800 w-fit mb-6">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="text-xs font-medium">Featured Product</span>
                  </div>

                  <h2 className="text-4xl font-bold text-teal-400 mb-4">
                    {featuredProducts[0].name}
                  </h2>
                  
                  <p className="text-gray-300 text-base mb-6">
                    {featuredProducts[0].description || `Premium quality ${featuredProducts[0].category} for your pet.`}
                  </p>
                  <img src={featuredProducts[0].image_url} alt={featuredProducts[0].name} className="w-full h-full object-cover" />
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-white">
                      {formatPrice(featuredProducts[0].price)}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getStockStatus(featuredProducts[0].quantity || 0).color}`}>
                      {getStockStatus(featuredProducts[0].quantity || 0).text}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleAddToCart(featuredProducts[0])}
                    disabled={!featuredProducts[0].quantity || featuredProducts[0].quantity === 0}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors w-fit disabled:opacity-50 disabled:cursor-not-allowed">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="font-medium">Add to Cart</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden bg-gray-900 min-h-[400px] flex items-center justify-center">
                <p className="text-white">No featured products available</p>
              </div>
            )}
          </div>

          {/* Quick Shop Section */}
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">Quick Shop</h3>
                <p className="text-sm text-gray-500">Fresh picks for food, toys, and accessories.</p>
              </div>
              <button 
                onClick={() => setActiveMenu('Shop')}
                className="text-sm font-medium text-teal-600 hover:text-teal-700">
                View All →
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {newProducts.length > 0 ? newProducts.map((product) => {
                  const stockStatus = getStockStatus(product.quantity || 0);
                  return (
                    <div key={product.id} className="bg-white rounded-xl p-4 flex flex-col min-w-[200px] hover:shadow-lg transition-shadow">
                      <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '';
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </div>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 text-sm">{product.name}</h4>
                        <span className="font-bold text-gray-800 text-sm">{formatPrice(product.price)}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                      <div className="mb-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${stockStatus.color}`}>
                          {stockStatus.text}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.quantity || product.quantity === 0}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors text-sm font-medium mt-auto disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  );
                }) : (
                  <div className="col-span-5 text-center py-8">
                    <p className="text-gray-500">No products available</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </main>
        
        {/* Help a Pet Today Banner */}
        <section className="bg-orange-50 border-t border-orange-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Help a Pet Today</h3>
                  <p className="text-sm text-gray-600">Your donation funds food, medical care, and safe shelter for animals in need.</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveMenu('Donate')}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Donate</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      )}

      {activeMenu === 'Shop' && (
        <div>
          <ShopPage />
        </div>
      )}

      {activeMenu === 'Adopt' && (
        <div>
          <AdoptPage />
        </div>
      )}

      {activeMenu === 'Donate' && (
        <div>
          <DonatePage />
        </div>
      )}

      {activeMenu === 'Cart' && (
        <div>
          <CartPage />  
        </div>
      )}
     
    </div>
  );
};

export default HomePage;