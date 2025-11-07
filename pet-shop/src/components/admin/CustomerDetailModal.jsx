import React, { useState, useEffect } from 'react';
import { customers } from '../../utils/customers';

const CustomerDetailModal = ({ customer, onClose }) => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!customer?.id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await customers.getById(customer.id);
        setCustomerDetails(response.data);
      } catch (err) {
        console.error('Error fetching customer details:', err);
        setError('Failed to load customer details');
        // Fallback to provided customer data
        setCustomerDetails(customer);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customer]);

  if (loading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: '#5C86E5' }}></div>
          </div>
        </div>
      </div>
    );
  }

  const customerData = customerDetails || customer;
  const fullName = `${customerData.first_name || ''} ${customerData.last_name || ''}`.trim() || 'N/A';
  const phone = customerData.phone || 'Not provided';
  const location = customerData.location || 'Not provided';
  const totalOrders = customerData.total_orders || 0;
  const totalSpent = customerData.total_spent ? `$${parseFloat(customerData.total_spent).toFixed(2)}` : '$0.00';
  const adoptions = customerData.adoptions || 0;
  const memberSince = customerData.created_at ? new Date(customerData.created_at).toLocaleDateString() : 'N/A';
  const lastActive = customerData.last_activity ? new Date(customerData.last_activity).toLocaleDateString() : 'N/A';

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
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#5C86E5' }}>
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>{fullName}</h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>{customerData.email || 'N/A'}</p>
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
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">{error}</p>
            </div>
          )}

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Phone</p>
                <p className="text-sm" style={{ color: '#1F2937' }}>{phone}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Location</p>
                <p className="text-sm" style={{ color: '#1F2937' }}>{location}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Member Since</p>
                <p className="text-sm" style={{ color: '#1F2937' }}>{memberSince}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Last Active</p>
                <p className="text-sm" style={{ color: '#1F2937' }}>{lastActive}</p>
              </div>
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Status</p>
                <p className="text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    customerData.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {customerData.is_active ? 'Active' : 'Inactive'}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Total Orders</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{totalOrders}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Total Spent</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{totalSpent}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-medium mb-1" style={{ color: '#6B7280' }}>Adoptions</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{adoptions}</p>
            </div>
          </div>

          {/* Note about orders and adoptions */}
          {(totalOrders === 0 && adoptions === 0) && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Order and adoption tracking will be available once the system is fully integrated with the orders and adoption management modules.
              </p>
            </div>
          )}

          {/* Recent Orders - Placeholder */}
          {totalOrders > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Recent Orders</h3>
              <div className="border rounded-lg p-4 text-center" style={{ borderColor: '#E5E5E5' }}>
                <p className="text-sm" style={{ color: '#6B7280' }}>Order history will be displayed here once the orders module is integrated.</p>
              </div>
            </div>
          )}

          {/* Adoptions - Placeholder */}
          {adoptions > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Adoptions</h3>
              <div className="border rounded-lg p-4 text-center" style={{ borderColor: '#E5E5E5' }}>
                <p className="text-sm" style={{ color: '#6B7280' }}>Adoption history will be displayed here once the adoption tracking is integrated.</p>
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
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailModal;