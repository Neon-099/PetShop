import React, { useState, useEffect, useMemo } from 'react';
import AddProductModal from '../../components/admin/AddProductModal';
import { products }  from '../../utils/products';


console.log('Products import:', products);
console.log('Type of products:', typeof products);
console.log('Has getAll?', typeof products?.getAll);
const ManageProductPage = () => {

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Updated');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20);

  // STATE FOR PRODUCTS AND LOADING
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products once
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all products (or a large number)
      const params = {
        page: 1,
        per_page: 1000 // Fetch a large number for client-side filtering
      };

      const response = await products.getAll(params);
      console.log("products: ", response);
      
      // Handle paginated response
      if (response.items) {
        setAllProducts(response.items);
      } else if (Array.isArray(response)) {
        setAllProducts(response);
      } else {
        setAllProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products');
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply search filter (case-insensitive)
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(product => {
        const name = (product.name || '').toLowerCase();
        const sku = (product.sku || '').toLowerCase();
        const description = (product.description || '').toLowerCase();
        const category = (product.category || '').toLowerCase();
        
        return name.includes(searchTerm) || 
               sku.includes(searchTerm) || 
               description.includes(searchTerm) ||
               category.includes(searchTerm);
      });
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply status filter
    if (selectedStatus === 'In Stock') {
      filtered = filtered.filter(product => product.is_active === 1 && product.quantity > 0);
    } else if (selectedStatus === 'Low Stock') {
      filtered = filtered.filter(product => product.quantity > 0 && product.quantity < 10);
    } else if (selectedStatus === 'Out of Stock') {
      filtered = filtered.filter(product => !product.is_active || product.quantity === 0);
    }

    // Apply sorting
    switch (sortBy) {
      case 'Name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'Price':
        filtered.sort((a, b) => parseFloat(a.price || 0) - parseFloat(b.price || 0));
        break;
      case 'Stock':
        filtered.sort((a, b) => (a.quantity || 0) - (b.quantity || 0));
        break;
      case 'Updated':
      default:
        filtered.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Paginate filtered results
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage, perPage]);

  // Calculate pagination info
  const pagination = useMemo(() => {
    const totalItems = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const from = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const to = Math.min(currentPage * perPage, totalItems);

    return {
      total_items: totalItems,
      total_pages: totalPages,
      current_page: currentPage,
      per_page: perPage,
      from,
      to,
      has_previous: currentPage > 1,
      has_next: currentPage < totalPages
    };
  }, [filteredAndSortedProducts.length, currentPage, perPage]);

  // Calculate stats from all products
  const stats = useMemo(() => {
    return {
      total: allProducts.length,
      lowStock: allProducts.filter(p => p.quantity > 0 && p.quantity < 10).length,
      hidden: allProducts.filter(p => !p.is_active).length,
      avgPrice: allProducts.length > 0 
        ? allProducts.reduce((sum, p) => sum + parseFloat(p.price || 0), 0) / allProducts.length 
        : 0
    };
  }, [allProducts]);

  // Initial load
  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedStatus, sortBy]);

  // Refresh when modal closes
  useEffect(() => {
    if (!showAddModal) {
      fetchProducts();
    }
  }, [showAddModal]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    try {
      await products.delete(productId);
      await fetchProducts(); // Refresh all products
    } catch (err) {
      console.error('Error deleting product:', err);
      alert(err.message || 'Failed to delete product');
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingProduct(null);
    fetchProducts(); // Refresh all products
  };

  const getStockStatus = (product) => {
    if (!product.is_active) {
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
    }
    
    if (product.quantity === 0) {
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
    }
    
    if (product.quantity < 10) {
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
    }
    
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
              <option>All</option>
              <option>Food</option>
              <option>Toys</option>
              <option>Accessories</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Any</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Updated</option>
              <option>Name</option>
              <option>Price</option>
              <option>Stock</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total Products</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Low Stock</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.lowStock}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Hidden</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.hidden}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Avg. Price</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>${stats.avgPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p style={{ color: '#6B7280' }}>Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Product Table - use paginatedProducts instead of productsList */}
          {!loading && !error && (
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
                  {paginatedProducts.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center" style={{ color: '#6B7280' }}>
                        No products found
                      </td>
                    </tr>
                  ) : (
                    paginatedProducts.map((product, index) => {
                      const stockStatus = getStockStatus(product);
                      return (
                        <tr key={product.id} className={index !== paginatedProducts.length - 1 ? 'border-b' : ''} style={{ borderColor: '#E5E5E5' }}>
                          <td className="px-6 py-4">
                            <img
                              src={product.image_url || 'https://via.placeholder.com/48?text=No+Image'}
                              alt={product.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium mb-1" style={{ color: '#1F2937' }}>{product.name}</p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>{product.sku || 'No SKU'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#FDFBF8', color: '#374151' }}>
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold" style={{ color: '#1F2937' }}>${parseFloat(product.price).toFixed(2)}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.textColor}`}>
                              {stockStatus.icon}
                              {stockStatus.text} ({product.quantity})
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleEdit(product)}
                                className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" 
                                style={{ borderColor: '#D1D5DB' }}
                                title="Edit"
                              >
                                <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => handleDelete(product.id)}
                                className="p-2 rounded-lg border hover:bg-red-50 transition-colors" 
                                style={{ borderColor: '#D1D5DB' }}
                                title="Delete"
                              >
                                <svg className="w-4 h-4" style={{ color: '#DC2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination - use pagination object */}
          {!loading && !error && pagination && pagination.total_pages > 0 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Showing {pagination.from}-{pagination.to} of {pagination.total_items}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={!pagination.has_previous}
                  className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: '#D1D5DB', color: '#374151' }}
                >
                  Prev
                </button>
                {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        currentPage === page ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                      style={{ borderColor: '#D1D5DB', color: '#374151' }}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!pagination.has_next}
                  className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: '#D1D5DB', color: '#374151' }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal  
          onClose={handleModalClose}
          product={editingProduct} 
        />
      )}
    </div>
  );
};

export default ManageProductPage;