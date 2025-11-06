import React, { useState } from 'react';
import CustomerDetailModal from '../../components/admin/CustomerDetailModal';

const ManageCustomersPage = () => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeMenu, setActiveMenu] = useState('Customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Updated');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample customer data
  const customers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      type: 'Regular',
      status: 'active',
      totalOrders: 12,
      totalSpent: '$1,245.00',
      adoptions: 2,
      joinedDate: '2023-01-15',
      lastActive: '2024-01-10',
      avatar: 'https://via.placeholder.com/48?text=SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '(555) 234-5678',
      location: 'Los Angeles, CA',
      type: 'Premium',
      status: 'active',
      totalOrders: 28,
      totalSpent: '$3,890.50',
      adoptions: 1,
      joinedDate: '2022-06-20',
      lastActive: '2024-01-12',
      avatar: 'https://via.placeholder.com/48?text=MC'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      phone: '(555) 345-6789',
      location: 'Chicago, IL',
      type: 'Regular',
      status: 'inactive',
      totalOrders: 5,
      totalSpent: '$320.00',
      adoptions: 0,
      joinedDate: '2023-08-10',
      lastActive: '2023-11-05',
      avatar: 'https://via.placeholder.com/48?text=ER'
    },
    {
      id: 4,
      name: 'David Kim',
      email: 'david.kim@email.com',
      phone: '(555) 456-7890',
      location: 'Houston, TX',
      type: 'Regular',
      status: 'active',
      totalOrders: 18,
      totalSpent: '$2,150.00',
      adoptions: 3,
      joinedDate: '2022-11-30',
      lastActive: '2024-01-11',
      avatar: 'https://via.placeholder.com/48?text=DK'
    },
    {
      id: 5,
      name: 'Jessica Martinez',
      email: 'jessica.m@email.com',
      phone: '(555) 567-8901',
      location: 'Phoenix, AZ',
      type: 'VIP',
      status: 'active',
      totalOrders: 45,
      totalSpent: '$6,780.00',
      adoptions: 2,
      joinedDate: '2021-03-15',
      lastActive: '2024-01-13',
      avatar: 'https://via.placeholder.com/48?text=JM'
    }
  ];

  const getCustomerType = (type) => {
    switch (type) {
      case 'VIP':
        return {
          bg: 'bg-purple-100',
          textColor: 'text-purple-700'
        };
      case 'Premium':
        return {
          bg: 'bg-blue-100',
          textColor: 'text-blue-700'
        };
      case 'Regular':
        return {
          bg: 'bg-gray-100',
          textColor: 'text-gray-700'
        };
      default:
        return {
          bg: 'bg-gray-100',
          textColor: 'text-gray-700'
        };
    }
  };

  const getCustomerStatus = (status) => {
    switch (status) {
      case 'active':
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
      case 'inactive':
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
      default:
        return null;
    }
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
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
                className="px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center gap-2 text-sm"
                style={{ backgroundColor: '#5C86E5' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4A6FD4'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#5C86E5'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Customer
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
              <option>Type: All</option>
              <option>Type: VIP</option>
              <option>Type: Premium</option>
              <option>Type: Regular</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Status: Any</option>
              <option>Status: Active</option>
              <option>Status: Inactive</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Sort: Updated</option>
              <option>Sort: Name</option>
              <option>Sort: Total Spent</option>
              <option>Sort: Orders</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total Customers</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>1,284</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#28A745' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +24 this month
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Active Customers</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>1,156</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#5C86E5' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                90% active rate
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total Adoptions</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>342</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#FFC107' }}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                By customers
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Avg. Order Value</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>$89.50</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#6B7280' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                Per customer
              </p>
            </div>
          </div>

          {/* Customers Table */}
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
                {customers.map((customer, index) => {
                  const typeInfo = getCustomerType(customer.type);
                  const statusInfo = getCustomerStatus(customer.status);
                  return (
                    <tr key={customer.id} className={index !== customers.length - 1 ? 'border-b' : ''} style={{ borderColor: '#E5E5E5' }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={customer.avatar}
                            alt={customer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium mb-1" style={{ color: '#1F2937' }}>{customer.name}</p>
                            <p className="text-xs" style={{ color: '#6B7280' }}>Joined {new Date(customer.joinedDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm mb-1" style={{ color: '#1F2937' }}>{customer.email}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>{customer.phone}</p>
                        <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{customer.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeInfo.bg} ${typeInfo.textColor}`}>
                          {customer.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{customer.totalOrders}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>Last: {new Date(customer.lastActive).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{customer.totalSpent}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold" style={{ color: '#1F2937' }}>{customer.adoptions}</span>
                          {customer.adoptions > 0 && (
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
                            onClick={() => handleViewCustomer(customer)}
                            className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" 
                            style={{ borderColor: '#D1D5DB' }}
                            title="View Details"
                          >
                            <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: '#D1D5DB' }}>
                            <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
            <p className="text-sm" style={{ color: '#6B7280' }}>Showing 1-5 of 1,284</p>
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
                disabled={currentPage === 1284 / 5}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Customer Detail Modal */}
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