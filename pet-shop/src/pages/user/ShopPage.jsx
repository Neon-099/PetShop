import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedAvailability, setSelectedAvailability] = useState('Any');
  const [selectedSort, setSelectedSort] = useState('Popular');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample products data - replace with actual API calls
  const products = [
    {
      id: 1,
      name: 'Premium Dog Food',
      price: '$28.00',
      category: 'Food',
      stock: 'In stock',
      image: 'https://via.placeholder.com/300x200?text=Premium+Dog+Food'
    },
    {
      id: 2,
      name: 'Plush Bone Toy',
      price: '$12.00',
      category: 'Toys',
      stock: 'Low',
      image: 'https://via.placeholder.com/300x200?text=Plush+Bone+Toy'
    },
    {
      id: 3,
      name: 'Water Fountain',
      price: '$49.00',
      category: 'Accessories',
      stock: 'In stock',
      image: 'https://via.placeholder.com/300x200?text=Water+Fountain'
    },
    {
      id: 4,
      name: 'Scratching Post',
      price: '$35.00',
      category: 'Accessories',
      stock: 'Out',
      image: 'https://via.placeholder.com/300x200?text=Scratching+Post'
    },
    {
      id: 5,
      name: 'Nylon Leash',
      price: '$16.00',
      category: 'Accessories',
      stock: 'In stock',
      image: 'https://via.placeholder.com/300x200?text=Nylon+Leash'
    },
    {
      id: 6,
      name: 'Salmon Cat Treats',
      price: '$9.00',
      category: 'Food',
      stock: 'In stock',
      image: 'https://via.placeholder.com/300x200?text=Salmon+Cat+Treats'
    }
  ];

  const categories = ['All Categories', 'Dog', 'Cat', 'Bird', 'Fish'];
  const availabilityOptions = ['Any', 'In Stock', 'Low Stock', 'Out of Stock'];
  const sortOptions = ['Popular', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Name A-Z'];

  const getStockColor = (stock) => {
    switch (stock) {
      case 'In stock':
        return 'text-gray-600';
      case 'Low':
        return 'text-orange-600';
      case 'Out':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFBF6' }}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="rounded-xl p-4" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
              {/* Browse Section */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Browse</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'text-gray-800'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      style={{
                        backgroundColor: selectedCategory === category ? '#FEFBF6' : 'transparent'
                      }}
                    >
                      {category === 'All Categories' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      )}
                      {category === 'Dog' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      )}
                      {category === 'Cat' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      )}
                      {category === 'Bird' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      )}
                      {category === 'Fish' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )}
                      <span>{category}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters Section */}
              <div>
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#1F2937' }}>Filters</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FEFBF6' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Price Range</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FEFBF6' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>In Stock</span>
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FEFBF6' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>New Arrivals</span>
                  </button>
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
                    Quickly add or feature products for the storefront
                  </p>
                </div>
                  <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Sync Catalog</span>
                  </button>
              </div>

              {/* Search and Filter Bar */}
              <div className="flex items-center gap-3 mt-4">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search in shop..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  />
                  <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span>Availability: {selectedAvailability}</span>
                </button>
                <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Category: {selectedCategory}</span>
                </button>
                <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span>Featured</span>
                </button>
                <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                  <span>Sort: {selectedSort}</span>
                </button>
              </div>
            </div>

            {/* Pet of the Week Spotlight */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-xl font-semibold mb-1" style={{ color: '#1F2937' }}>
                    Pet of the Week Spotlight
                  </h2>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    Highlight a cuddly friend and pair with recommended products.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Generate Bundle</span>
                  </button>
                  <button className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span>Link to Adopt</span>
                  </button>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
                <img
                  src="https://via.placeholder.com/800x400?text=Happy+Dog+with+Blue+Collar"
                  alt="Pet of the Week"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-xl overflow-hidden"
                    style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-1" style={{ color: '#1F2937' }}>
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold mb-2" style={{ color: '#1F2937' }}>
                        {product.price}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs" style={{ color: '#6B7280' }}>
                          {product.category}
                        </span>
                        <span className={`text-xs font-medium ${getStockColor(product.stock)}`}>
                          {product.stock}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="flex-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View</span>
                        </button>
                        <button className="flex-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          <span>Feature</span>
                        </button>
                        <button className="flex-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          <span className="text-xs">Add to<br />Shop</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between">
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Showing 1-6 of 128
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
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'text-gray-800'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: currentPage === page ? '#FEFBF6' : 'transparent',
                      border: '1px solid #D1D5DB'
                    }}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={currentPage === 3}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}
                >
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;