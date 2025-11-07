import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../utils/products';
import { cart } from '../../utils/cart';

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, per_page: 12 });
  const [cartItems, setCartItems] = useState([]);

  const categories = ['All Categories', 'Food', 'Toys', 'Accessories', 'Health', 'Grooming'];

  useEffect(() => {
    fetchProducts();
    loadCart();
  }, [currentPage, selectedCategory, searchQuery, selectedSort]);

  const loadCart = () => {
    setCartItems(cart.getItems());
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        per_page: 12,
        is_active: 1 // Only show active products
      };

      if (selectedCategory !== 'All Categories') {
        params.category = selectedCategory;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await products.getAll(params);
      
      // Handle different response structures
      const data = response.products || response.data || response;
      const items = Array.isArray(data) ? data : (data.items || []);
      
      setProductsList(items);
      
      if (response.pagination) {
        setPagination(response.pagination);
      } else if (response.total !== undefined) {
        setPagination({
          total: response.total,
          per_page: params.per_page
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProductsList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    
    if(product.quantity <= 0){
      alert('Product is out of stock');
      return;
    }
    cart.addItem(product, 1);
    loadCart();
    alert(`${product.name} added to cart!`);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (quantity < 10) return { text: 'Low Stock', color: 'text-orange-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFBF6' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="rounded-xl p-4" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Browse</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'text-gray-800 bg-gray-100'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Shop Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h1 className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>Shop</h1>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Browse our selection of pet products
                  </p>
                </div>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex items-center gap-3 mt-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  />
                  <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                  <span>Category: {selectedCategory}</span>
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p style={{ color: '#6B7280' }}>Loading products...</p>
              </div>
            )}

            {/* Product Grid */}
            {!loading && productsList.length === 0 && (
              <div className="text-center py-12">
                <p style={{ color: '#6B7280' }}>No products found.</p>
              </div>
            )}

            {!loading && productsList.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productsList.map((product) => {
                    const stockStatus = getStockStatus(product.quantity || 0);
                    return (
                      <div
                        key={product.id}
                        className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                        style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}
                      >
                        <div className="relative">
                          <img
                            src={product.image_url || 'https://via.placeholder.com/300x200?text=Product'}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200?text=Product';
                            }}
                          />
                          {product.quantity === 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white font-semibold">Out of Stock</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold mb-1" style={{ color: '#1F2937' }}>
                            {product.name}
                          </h3>
                          <p className="text-lg font-bold mb-2" style={{ color: '#1F2937' }}>
                            {formatPrice(product.price)}
                          </p>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs" style={{ color: '#6B7280' }}>
                              {product.category}
                            </span>
                            <span className={`text-xs font-medium ${stockStatus.color}`}>
                              {stockStatus.text}
                            </span>
                            
                          </div>
                          <span  
                            className={`text-xs flex items-start mb-2 
                              ${product.quantity <= 5 ? 'text-green-600' : 'text-red-600'}
                              `} >
                              <span className='text-black font-bold'> {product.quantity} </span> {product.quantity <= 5 ? ' stock' : ' stocks'}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAddToCart(product)}
                              disabled={product.quantity === 0}
                              className="flex-1 px-3 py-2 rounded-lg text-white hover:opacity-90 transition-colors flex items-center justify-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{ backgroundColor: product.quantity === 0 ? '#9CA3AF' : '#14B8A6' }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                              </svg>
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pagination */}
            {!loading && pagination.total > 0 && (
              <div className="flex items-center justify-between">
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Showing {((currentPage - 1) * pagination.per_page) + 1}-{Math.min(currentPage * pagination.per_page, pagination.total)} of {pagination.total}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}
                  >
                    Prev
                  </button>
                  {Array.from({ length: Math.ceil(pagination.total / pagination.per_page) }, (_, i) => i + 1)
                    .slice(Math.max(0, currentPage - 2), currentPage + 3)
                    .map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          currentPage === page
                            ? 'text-gray-800 bg-gray-100'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        style={{ border: '1px solid #D1D5DB' }}
                      >
                        {page}
                      </button>
                    ))}
                  <button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={currentPage >= Math.ceil(pagination.total / pagination.per_page)}
                    className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;