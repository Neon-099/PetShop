import React, { useState } from 'react';

const AddProductModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: URL.createObjectURL(file)
      }));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#E5E5E5' }}>
          <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Add New Product</h2>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Product Image
            </label>
            <div className="flex items-center gap-4">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg object-cover border"
                  style={{ borderColor: '#E5E5E5' }}
                />
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center" style={{ borderColor: '#D1D5DB', backgroundColor: '#F9FAFB' }}>
                  <svg className="w-8 h-8" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              <label className="px-4 py-2 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 text-sm font-medium" style={{ borderColor: '#D1D5DB', color: '#374151' }}>
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter product description"
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
            />
          </div>

          {/* Category and Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Toys">Toys</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm" style={{ color: '#6B7280' }}>$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
                />
              </div>
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter stock quantity"
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
            />
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Weight/Size
              </label>
              <input
                type="text"
                name="details"
                placeholder="e.g., 1.5kg • Protein-rich"
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                SKU
              </label>
              <input
                type="text"
                name="sku"
                placeholder="Product SKU"
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
              style={{ backgroundColor: '#5C86E5' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#4A6FD4'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#5C86E5'}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;