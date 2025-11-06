import React from 'react';

const AdminHeader = ({ 
  subtitle, 
  showSearch = false, 
  searchPlaceholder = "Search...",
  actionButtons = []
}) => {
  return (
    <header className="px-8 py-6 border-b bg-white" style={{ borderColor: '#E5E5E5' }}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>
            Pet eCommerce & Adoption 
          </h1>
            <p className="text-sm" style={{ color: '#6B7280' }}>
            Monitor sales, inventory, and pets awaiting a loving home
            </p>
        </div>
        <div className="flex items-center gap-3">
         
          {actionButtons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm ${
                button.primary 
                  ? 'text-white' 
                  : 'border hover:bg-gray-50'
              }`}
              style={
                button.primary
                  ? { backgroundColor: '#5C86E5' }
                  : { borderColor: '#D1D5DB', color: '#374151' }
              }
              onMouseEnter={(e) => {
                if (button.primary) {
                  e.target.style.backgroundColor = '#4A6FD4';
                }
              }}
              onMouseLeave={(e) => {
                if (button.primary) {
                  e.target.style.backgroundColor = '#5C86E5';
                }
              }}
            >
              {button.icon && (
                <span className="flex items-center">
                  {button.icon}
                </span>
              )}
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;