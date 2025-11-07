import React, { useState, useEffect } from 'react';
import  { products } from '../../utils/products';

const AddProductModal = ({ onClose, product = null }) => {
  const isEditing = !!product;
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    weight: '',
    image_url: '',
    is_active: 1
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form if editing
  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku || '',
        name: product.name || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price || '',
        quantity: product.quantity || '',
        weight: product.weight || '',
        image_url: product.image_url || '',
        is_active: product.is_active !== undefined ? product.is_active : 1
      });
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Prepare data
      const submitData = {
        sku: formData.sku,
        name: formData.name,
        description: formData.description || null,
        category: formData.category,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity) || 0,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        image_url: formData.image_url || null,
        is_active: formData.is_active ? 1 : 0
      };

      if (isEditing) {
        await products.update(product.id, submitData);
      } else {
        await products.create(submitData);
      }

      onClose();
    } catch (err) {
      console.error('Error saving product:', err);
      
      // Handle validation errors
      if (err.errors || err.fieldErrors) {
        setErrors(err.errors || err.fieldErrors || {});
      } else {
        setErrors({ general: err.message || 'Failed to save product' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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
          <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
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
          {/* General Error */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm">{errors.general}</p>
            </div>
          )}

          {/* SKU and Name Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                SKU *
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                required
                placeholder="e.g., DOG-FOOD-001"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.sku ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.sku ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              />
              {errors.sku && (
                <p className="text-red-600 text-xs mt-1">{errors.sku[0] || errors.sku}</p>
              )}
            </div>
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
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.name ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.name ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name[0] || errors.name}</p>
              )}
            </div>
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
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none ${
                errors.description ? 'border-red-300' : ''
              }`}
              style={{ borderColor: errors.description ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1">{errors.description[0] || errors.description}</p>
            )}
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
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.category ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.category ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select category</option>
                <option value="Food">Food</option>
                <option value="Toys">Toys</option>
                <option value="Accessories">Accessories</option>
              </select>
              {errors.category && (
                <p className="text-red-600 text-xs mt-1">{errors.category[0] || errors.category}</p>
              )}
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
                  className={`w-full pl-8 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.price ? 'border-red-300' : ''
                  }`}
                  style={{ borderColor: errors.price ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
                />
              </div>
              {errors.price && (
                <p className="text-red-600 text-xs mt-1">{errors.price[0] || errors.price}</p>
              )}
            </div>
          </div>

          {/* Quantity and Weight Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Stock Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="0"
                placeholder="Enter stock quantity"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.quantity ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.quantity ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              />
              {errors.quantity && (
                <p className="text-red-600 text-xs mt-1">{errors.quantity[0] || errors.quantity}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="Enter weight"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.weight ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.weight ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              />
              {errors.weight && (
                <p className="text-red-600 text-xs mt-1">{errors.weight[0] || errors.weight}</p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Image URL
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.image_url ? 'border-red-300' : ''
              }`}
              style={{ borderColor: errors.image_url ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
            />
            {errors.image_url && (
              <p className="text-red-600 text-xs mt-1">{errors.image_url[0] || errors.image_url}</p>
            )}
            {formData.image_url && (
              <img
                src={formData.image_url}
                alt="Preview"
                className="mt-2 w-24 h-24 rounded-lg object-cover border"
                style={{ borderColor: '#E5E5E5' }}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_active"
              checked={formData.is_active === 1}
              onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked ? 1 : 0 }))}
              className="w-4 h-4 rounded border-gray-300"
            />
            <label className="text-sm font-medium" style={{ color: '#374151' }}>
              Product is active (visible to customers)
            </label>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t" style={{ borderColor: '#E5E5E5' }}>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-6 py-2.5 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50"
              style={{ backgroundColor: '#5C86E5' }}
              onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = '#4A6FD4')}
              onMouseLeave={(e) => !loading && (e.target.style.backgroundColor = '#5C86E5')}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Add Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;