import React from 'react';
import { Link } from 'react-router-dom';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white mt-auto" style={{ borderColor: '#E5E5E5' }}>
      <div className="px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Section - Copyright and Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm" style={{ color: '#6B7280' }}>
            <p className="flex items-center gap-2">
              <span>© {currentYear} Paw Market. All rights reserved.</span>
            </p>
            <div className="flex items-center gap-4">
              <Link 
                to="/admin/dashboard" 
                className="hover:underline transition-colors"
                style={{ color: '#5C86E5' }}
              >
                Privacy Policy
              </Link>
              <span style={{ color: '#D1D5DB' }}>|</span>
              <Link 
                to="/admin/dashboard" 
                className="hover:underline transition-colors"
                style={{ color: '#5C86E5' }}
              >
                Terms of Service
              </Link>
              <span style={{ color: '#D1D5DB' }}>|</span>
              <Link 
                to="/" 
                className="hover:underline transition-colors"
                style={{ color: '#5C86E5' }}
              >
                Customer Portal
              </Link>
            </div>
          </div>

          {/* Right Section - Status and Version */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium" 
                 style={{ backgroundColor: '#D4EDDA', color: '#28A745' }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.3"/>
                <circle cx="12" cy="12" r="6" fill="currentColor"/>
              </svg>
              System Operational
            </div>
            <div className="text-xs" style={{ color: '#9CA3AF' }}>
              v1.0.0
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Info */}
        <div className="mt-4 pt-4 border-t text-center text-xs" style={{ borderColor: '#E5E5E5', color: '#9CA3AF' }}>
          <p>For support, contact us at <a href="mailto:support@pawmarket.com" className="underline" style={{ color: '#5C86E5' }}>support@pawmarket.com</a></p>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;