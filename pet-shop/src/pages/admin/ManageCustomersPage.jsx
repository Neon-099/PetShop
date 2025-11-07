import React, { useState, useEffect, useMemo } from 'react';
import EditCustomerModal from '../../components/admin/EditCustomerModal'; // Renamed import
import CustomerDetailModal from '../../components/admin/CustomerDetailModal';
import { customers } from '../../utils/customers';

const ManageCustomersPage = () => {
  const [showEditModal, setShowEditModal] = useState(false); // Renamed from showAddModal
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Updated');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20);

  // State for customers and loading
  const [allCustomers, setAllCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for customer detail modal
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch all customers once
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all customers (or a large number)
      const params = {
        page: 1,
        per_page: 1000 // Fetch a large number for client-side filtering
      };

      const response = await customers.getAll(params);
      console.log("Customers response: ", response);
      
      // Handle paginated response
      if (response.items) {
        setAllCustomers(response.items);
      } else if (Array.isArray(response)) {
        setAllCustomers(response);
      } else {
        setAllCustomers([]);
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError(err.message || 'Failed to load customers');
      setAllCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering and sorting
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = [...allCustomers];

    // Apply search filter (case-insensitive)
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(customer => {
        const firstName = (customer.first_name || '').toLowerCase();
        const lastName = (customer.last_name || '').toLowerCase();
        const fullName = `${firstName} ${lastName}`.toLowerCase();
        const email = (customer.email || '').toLowerCase();
        const phone = (customer.phone || '').toLowerCase();
        const location = (customer.location || '').toLowerCase();
        
        return fullName.includes(searchTerm) || 
               email.includes(searchTerm) || 
               phone.includes(searchTerm) ||
               location.includes(searchTerm);
      });
    }

    // Apply type filter (if you have customer types)
    if (selectedType !== 'All') {
      // You can implement customer type logic here
      // For now, we'll skip this filter
    }

    // Apply status filter
    if (selectedStatus === 'Active') {
      filtered = filtered.filter(customer => customer.is_active === 1 || customer.is_active === true);
    } else if (selectedStatus === 'Inactive') {
      filtered = filtered.filter(customer => customer.is_active === 0 || customer.is_active === false);
    }

    // Apply sorting
    switch (sortBy) {
      case 'Name':
        filtered.sort((a, b) => {
          const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim();
          const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim();
          return nameA.localeCompare(nameB);
        });
        break;
      case 'Total Spent':
        // If you have total_spent field
        filtered.sort((a, b) => parseFloat(a.total_spent || 0) - parseFloat(b.total_spent || 0));
        break;
      case 'Orders':
        // If you have total_orders field
        filtered.sort((a, b) => (a.total_orders || 0) - (b.total_orders || 0));
        break;
      case 'Updated':
      default:
        filtered.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
        break;
    }

    return filtered;
  }, [allCustomers, searchQuery, selectedType, selectedStatus, sortBy]);

  // Paginate filtered results
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredAndSortedCustomers.slice(startIndex, endIndex);
  }, [filteredAndSortedCustomers, currentPage, perPage]);

  // Calculate pagination info
  const pagination = useMemo(() => {
    const totalItems = filteredAndSortedCustomers.length;
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
  }, [filteredAndSortedCustomers.length, currentPage, perPage]);

  // Calculate stats from all customers
  const stats = useMemo(() => {
    const active = allCustomers.filter(c => c.is_active === 1 || c.is_active === true).length;
    const totalAdoptions = allCustomers.reduce((sum, c) => sum + (c.adoptions || 0), 0);
    const totalSpent = allCustomers.reduce((sum, c) => sum + parseFloat(c.total_spent || 0), 0);
    const avgOrderValue = allCustomers.length > 0 ? totalSpent / allCustomers.length : 0;

    return {
      total: allCustomers.length,
      active,
      adoptions: totalAdoptions,
      avgOrderValue
    };
  }, [allCustomers]);

  // Initial load
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, selectedStatus, sortBy]);

  // Refresh when modal closes
  useEffect(() => {
    if (!showEditModal) {
      fetchCustomers();
    }
  }, [showEditModal]);

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowEditModal(true);
  };

  const handleDelete = async (customerId) => {
    if (!window.confirm('Are you sure you want to delete this customer?')) {
      return;
    }
    
    try {
      await customers.delete(customerId);
      await fetchCustomers(); // Refresh all customers
    } catch (err) {
      console.error('Error deleting customer:', err);
      alert(err.message || 'Failed to delete customer');
    }
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setEditingCustomer(null);
    fetchCustomers(); // Refresh all customers
  };

  const getCustomerType = (customer) => {
    // Determine customer type based on total_spent or orders
    const totalSpent = parseFloat(customer.total_spent || 0);
    const totalOrders = customer.total_orders || 0;
    
    if (totalSpent >= 5000 || totalOrders >= 50) {
        return {
        text: 'VIP',
          bg: 'bg-purple-100',
          textColor: 'text-purple-700'
        };
    } else if (totalSpent >= 2000 || totalOrders >= 20) {
        return {
        text: 'Premium',
          bg: 'bg-blue-100',
          textColor: 'text-blue-700'
        };
    } else {
        return {
        text: 'Regular',
          bg: 'bg-gray-100',
          textColor: 'text-gray-700'
        };
    }
  };

  const getCustomerStatus = (status) => {
    const isActive = status === 1 || status === true || status === 'active';
    if (isActive) {
        return {
          text: 'Active',
          bg: 'bg-green-100',
          textColor: 'text-green-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
    } else {
        return {
          text: 'Inactive',
          bg: 'bg-gray-100',
          textColor: 'text-gray-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          )
        };
    }
  };

  // Generate avatar initials
  const getAvatarInitials = (customer) => {
    const first = (customer.first_name || '').charAt(0).toUpperCase();
    const last = (customer.last_name || '').charAt(0).toUpperCase();
    return `${first}${last}` || 'CU';
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FDFBF8' }}>
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Header */}
        <header className="px-8 py-6 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>Customers</h1>
              <p className="text-sm" style={{ color: '#6B7280' }}>Manage customer accounts, orders, and adoptions</p>
            </div>
            {/* REMOVED: New Customer button - customers come from user registration */}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Search and Filters */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search customers by name, email, or phone..."
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
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>All</option>
              <option>VIP</option>
              <option>Premium</option>
              <option>Regular</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Any</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Updated</option>
              <option>Name</option>
              <option>Total Spent</option>
              <option>Orders</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total Customers</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Active Customers</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.active}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total Adoptions</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.adoptions}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Avg. Order Value</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>${stats.avgOrderValue.toFixed(2)}</p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p style={{ color: '#6B7280' }}>Loading customers...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Customers Table */}
          {!loading && !error && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E5E5' }}>
            <table className="w-full">
              <thead style={{ backgroundColor: '#F9FAFB' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Total Spent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Adoptions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                  {paginatedCustomers.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center" style={{ color: '#6B7280' }}>
                        No customers found
                      </td>
                    </tr>
                  ) : (
                    paginatedCustomers.map((customer, index) => {
                      const typeInfo = getCustomerType(customer);
                      const statusInfo = getCustomerStatus(customer.is_active);
                      const fullName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim();
                      
                  return (
                        <tr key={customer.id || customer.user_id} className={index !== paginatedCustomers.length - 1 ? 'border-b' : ''} style={{ borderColor: '#E5E5E5' }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{ backgroundColor: '#5C86E5' }}>
                                {getAvatarInitials(customer)}
                              </div>
                          <div>
                                <p className="font-medium mb-1" style={{ color: '#1F2937' }}>{fullName || 'N/A'}</p>
                                <p className="text-xs" style={{ color: '#6B7280' }}>
                                  Joined {customer.created_at ? new Date(customer.created_at).toLocaleDateString() : 'N/A'}
                                </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                            <p className="text-sm mb-1" style={{ color: '#1F2937' }}>{customer.email || 'N/A'}</p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>{customer.phone || 'N/A'}</p>
                            <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{customer.location || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeInfo.bg} ${typeInfo.textColor}`}>
                              {typeInfo.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                            <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{customer.total_orders || 0}</p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>
                              {customer.last_activity ? `Last: ${new Date(customer.last_activity).toLocaleDateString()}` : 'Never'}
                            </p>
                      </td>
                      <td className="px-6 py-4">
                            <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                              ${parseFloat(customer.total_spent || 0).toFixed(2)}
                            </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold" style={{ color: '#1F2937' }}>{customer.adoptions || 0}</span>
                              {(customer.adoptions || 0) > 0 && (
                            <svg className="w-4 h-4" style={{ color: '#5C86E5' }} fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.textColor}`}>
                          {statusInfo.icon}
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                                onClick={() => handleEdit(customer)}
                            className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" 
                            style={{ borderColor: '#D1D5DB' }}
                                title="Edit"
                              >
                            <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                              <button 
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setShowDetailModal(true);
                                }}
                                className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" 
                                style={{ borderColor: '#D1D5DB' }}
                                title="View"
                              >
                                <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 6v.002A5 5 0 0110 11a5 5 0 007 4.938V17h-2.062A5 5 0 015 12a5 5 0 007-4.938V8H5.062A5 5 0 015 12a5 5 0 007 4.938V17H5" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => handleDelete(customer.id || customer.user_id)}
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

          {/* Pagination */}
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

      {/* Edit Customer Modal - Only show when editing */}
      {showEditModal && editingCustomer && (
        <EditCustomerModal 
          onClose={handleModalClose}
          customer={editingCustomer}
        />
      )}

      {showDetailModal && selectedCustomer && (
        <CustomerDetailModal
          customer={selectedCustomer}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageCustomersPage;