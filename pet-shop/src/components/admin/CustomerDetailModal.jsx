import React from 'react';

const CustomerDetailModal = ({ customer, onClose }) => {
  // Sample data for customer details
  const customerOrders = [
    { id: 1, date: '2024-01-10', items: 3, total: '$145.00', status: 'Delivered' },
    { id: 2, date: '2024-01-05', items: 2, total: '$89.50', status: 'Delivered' },
    { id: 3, date: '2023-12-28', items: 5, total: '$234.00', status: 'Delivered' }
  ];

  const customerAdoptions = [
    { id: 1, petName: 'Luna', breed: 'Golden Retriever', date: '2023-06-15', status: 'Completed' },
    { id: 2, petName: 'Max', breed: 'Beagle', date: '2023-11-20', status: 'Completed' }
  ];

  const getOrderStatus = (status) => {
    switch (status) {
      case 'Delivered':
        return { bg: 'bg-green-100', textColor: 'text-green-700' };
      case 'Pending':
        return { bg: 'bg-yellow-100', textColor: 'text-yellow-700' };
      case 'Cancelled':
        return { bg: 'bg-red-100', textColor: 'text-red-700' };
      default:
        return { bg: 'bg-gray-100', textColor: 'text-gray-700' };
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-center gap-4">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>{customer.name}</h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>{customer.email}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" style={{ color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Phone</p>
                <p className="text-sm" style={{ color: '#1F2937' }}>{customer.phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Location</p>
                <p className="text-sm" style={{ color: '#1F2937' }}>{customer.location}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Member Since</p>
                <p className="text-sm" style={{ color: '#1F2937' }}>{new Date(customer.joinedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Last Active</p>
                <p className="text-sm" style={{ color: '#1F2937' }}>{new Date(customer.lastActive).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Total Orders</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{customer.totalOrders}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Total Spent</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{customer.totalSpent}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Adoptions</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{customer.adoptions}</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Recent Orders</h3>
            <div className="border rounded-lg overflow-hidden" style={{ borderColor: '#E5E5E5' }}>
              <table className="w-full">
                <thead style={{ backgroundColor: '#F9FAFB' }}>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#374151' }}>Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#374151' }}>Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#374151' }}>Items</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#374151' }}>Total</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold" style={{ color: '#374151' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customerOrders.map((order, index) => {
                    const statusInfo = getOrderStatus(order.status);
                    return (
                      <tr key={order.id} className={index !== customerOrders.length - 1 ? 'border-b' : ''} style={{ borderColor: '#E5E5E5' }}>
                        <td className="px-4 py-3 text-sm" style={{ color: '#1F2937' }}>#{order.id}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: '#6B7280' }}>{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-sm" style={{ color: '#6B7280' }}>{order.items}</td>
                        <td className="px-4 py-3 text-sm font-semibold" style={{ color: '#1F2937' }}>{order.total}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.textColor}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Adoptions */}
          {customerAdoptions.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Adoptions</h3>
              <div className="space-y-3">
                {customerAdoptions.map((adoption) => (
                  <div key={adoption.id} className="flex items-center justify-between p-4 border rounded-lg" style={{ borderColor: '#E5E5E5' }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FDFBF8' }}>
                        <svg className="w-6 h-6" style={{ color: '#5C86E5' }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium" style={{ color: '#1F2937' }}>{adoption.petName}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>{adoption.breed} • Adopted {new Date(adoption.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {adoption.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: '#E5E5E5' }}>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
            style={{ borderColor: '#D1D5DB', color: '#374151' }}
          >
            Close
          </button>
          <button
            className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
            style={{ backgroundColor: '#5C86E5' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#4A6FD4'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#5C86E5'}
          >
            Contact Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;