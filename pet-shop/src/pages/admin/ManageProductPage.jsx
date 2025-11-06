import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/auth';
import AddProductModal from '../../components/admin/AddProductModal';

const ManageProductPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Updated');
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = async () => {
    try {
      await auth.logout();
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Premium Dog Food',
      details: '1.5kg • Protein-rich',
      category: 'Food',
      price: '$28.00',
      stock: 'in',
      image: 'https://via.placeholder.com/48?text=Dog+Food'
    },
    {
      id: 2,
      name: 'Interactive Cat Toy',
      details: 'Feather wand • Durable',
      category: 'Toys',
      price: '$15.00',
      stock: 'low',
      image: 'https://via.placeholder.com/48?text=Cat+Toy'
    },
    {
      id: 3,
      name: 'Leather Dog Leash',
      details: '6ft • Adjustable',
      category: 'Accessories',
      price: '$22.00',
      stock: 'in',
      image: 'https://via.placeholder.com/48?text=Leash'
    },
    {
      id: 4,
      name: 'Cat Scratching Post',
      details: '32" • Sisal rope',
      category: 'Accessories',
      price: '$45.00',
      stock: 'out',
      image: 'https://via.placeholder.com/48?text=Post'
    },
    {
      id: 5,
      name: 'Premium Cat Food',
      details: '2kg • Grain-free',
      category: 'Food',
      price: '$32.00',
      stock: 'in',
      image: 'https://via.placeholder.com/48?text=Cat+Food'
    }
  ];
  const getStockStatus = (stock) => {
    switch (stock) {
      case 'in':
        return {
          text: 'In stock',
          bg: 'bg-green-100',
          textColor: 'text-green-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'low':
        return {
          text: 'Low',
          bg: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          )
        };
      case 'out':
        return {
          text: 'Out',
          bg: 'bg-red-100',
          textColor: 'text-red-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FDFBF8' }}>
    

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Header */}
        <header className="px-8 py-6 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>Products</h1>
              <p className="text-sm" style={{ color: '#6B7280' }}>Manage listings for food, toys, and accessories</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium transition-colors hover:bg-gray-50" style={{ borderColor: '#D1D5DB', color: '#374151' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Import
              </button>
              <button className="px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium transition-colors hover:bg-gray-50" style={{ borderColor: '#D1D5DB', color: '#374151' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center gap-2 text-sm"
                style={{ backgroundColor: '#5C86E5' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4A6FD4'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#5C86E5'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Product
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Search and Filters */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB' }}
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Category: All</option>
              <option>Category: Food</option>
              <option>Category: Toys</option>
              <option>Category: Accessories</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Status: Any</option>
              <option>Status: In Stock</option>
              <option>Status: Low Stock</option>
              <option>Status: Out of Stock</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Sort: Updated</option>
              <option>Sort: Name</option>
              <option>Sort: Price</option>
              <option>Sort: Stock</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total Products</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>128</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#28A745' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +6 this week
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Low Stock</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>9</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#FFC107' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                ▲ Review
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Hidden</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>4</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#6B7280' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.736m0 0L21 21" />
                </svg>
                Not listed
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Avg. Price</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>$22.40</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#5C86E5' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Stable
              </p>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E5E5' }}>
            <table className="w-full">
              <thead style={{ backgroundColor: '#F9FAFB' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Photo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const stockStatus = getStockStatus(product.stock);
                  return (
                    <tr key={product.id} className={index !== products.length - 1 ? 'border-b' : ''} style={{ borderColor: '#E5E5E5' }}>
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium mb-1" style={{ color: '#1F2937' }}>{product.name}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>{product.details}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FDFBF8', color: '#374151' }}>
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold" style={{ color: '#1F2937' }}>{product.price}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.textColor}`}>
                          {stockStatus.icon}
                          {stockStatus.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: '#D1D5DB' }}>
                            <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: '#D1D5DB' }}>
                            <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm" style={{ color: '#6B7280' }}>Showing 1-5 of 128</p>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  currentPage === 1 ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                disabled={currentPage === 128 / 5}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default ManageProductPage;