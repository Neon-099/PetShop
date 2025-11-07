import React, { useState, useEffect } from 'react';
import { adoptions } from '../../utils/adoptions';

const AddAdoptionModal = ({ onClose, adoption = null }) => {
  const isEditing = !!adoption;
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    color: '',
    location: '',
    status: 'Available',
    description: '',
    personality: '',
    medical_notes: '',
    image_url: '',
    is_active: 1
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form if editing
  useEffect(() => {
    if (adoption) {
      setFormData({
        name: adoption.name || '',
        species: adoption.species || '',
        breed: adoption.breed || '',
        age: adoption.age || '',
        gender: adoption.gender || '',
        size: adoption.size || '',
        color: adoption.color || '',
        location: adoption.location || '',
        status: adoption.status || 'Available',
        description: adoption.description || '',
        personality: adoption.personality || '',
        medical_notes: adoption.medical_notes || '',
        image_url: adoption.image_url || '',
        is_active: adoption.is_active !== undefined ? adoption.is_active : 1
      });
    }
  }, [adoption]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Prepare data - map frontend field names to backend field names
      const submitData = {
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: formData.age,
        gender: formData.gender,
        size: formData.size,
        color: formData.color || null,
        location: formData.location,
        status: formData.status,
        description: formData.description || null,
        personality: formData.personality || null,
        medical_notes: formData.medical_notes || null,
        image_url: formData.image_url || null,
        is_active: formData.is_active ? 1 : 0
      };

      if (isEditing) {
        await adoptions.update(adoption.id, submitData);
      } else {
        await adoptions.create(submitData);
      }

      onClose();
    } catch (err) {
      console.error('Error saving adoption:', err);
      
      // Handle validation errors
      if (err.errors || err.fieldErrors) {
        setErrors(err.errors || err.fieldErrors || {});
      } else {
        setErrors({ general: err.message || 'Failed to save adoption' });
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
            {isEditing ? 'Edit Pet for Adoption' : 'Add New Pet for Adoption'}
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

          {/* Pet Image URL */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Pet Photo URL
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/pet-image.jpg"
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

          {/* Pet Name and Species */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Pet Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter pet name"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.name ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.name ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name[0] || errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Species *
              </label>
              <select
                name="species"
                value={formData.species}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.species ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.species ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
              {errors.species && (
                <p className="text-red-600 text-xs mt-1">{errors.species[0] || errors.species}</p>
              )}
            </div>
          </div>

          {/* Breed and Age */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Breed *
              </label>
              <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
                placeholder="e.g., Golden Retriever"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.breed ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.breed ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              />
              {errors.breed && (
                <p className="text-red-600 text-xs mt-1">{errors.breed[0] || errors.breed}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Age *
              </label>
              <input
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                placeholder="e.g., 2 years"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.age ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.age ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              />
              {errors.age && (
                <p className="text-red-600 text-xs mt-1">{errors.age[0] || errors.age}</p>
              )}
            </div>
          </div>

          {/* Gender, Size, and Color */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Gender *
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.gender ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.gender ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-600 text-xs mt-1">{errors.gender[0] || errors.gender}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Size *
              </label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.size ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.size ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
              {errors.size && (
                <p className="text-red-600 text-xs mt-1">{errors.size[0] || errors.size}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g., Golden, Brown"
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.color ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.color ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              />
              {errors.color && (
                <p className="text-red-600 text-xs mt-1">{errors.color[0] || errors.color}</p>
              )}
            </div>
          </div>

          {/* Location and Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Location *
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.location ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.location ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select location</option>
                <option value="Shelter A">Shelter A</option>
                <option value="Shelter B">Shelter B</option>
                <option value="Shelter C">Shelter C</option>
                <option value="Shelter D">Shelter D</option>
                <option value="Shelter E">Shelter E</option>
              </select>
              {errors.location && (
                <p className="text-red-600 text-xs mt-1">{errors.location[0] || errors.location}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.status ? 'border-red-300' : ''
                }`}
                style={{ borderColor: errors.status ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
              >
                <option value="Available">Available</option>
                <option value="Pending">Pending</option>
                <option value="Adopted">Adopted</option>
              </select>
              {errors.status && (
                <p className="text-red-600 text-xs mt-1">{errors.status[0] || errors.status}</p>
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
              placeholder="Tell us about this pet..."
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none ${
                errors.description ? 'border-red-300' : ''
              }`}
              style={{ borderColor: errors.description ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
            />
            {errors.description && (
              <p className="text-red-600 text-xs mt-1">{errors.description[0] || errors.description}</p>
            )}
          </div>

          {/* Personality */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Personality Traits
            </label>
            <input
              type="text"
              name="personality"
              value={formData.personality}
              onChange={handleChange}
              placeholder="e.g., Friendly, Playful, Calm"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.personality ? 'border-red-300' : ''
              }`}
              style={{ borderColor: errors.personality ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
            />
            {errors.personality && (
              <p className="text-red-600 text-xs mt-1">{errors.personality[0] || errors.personality}</p>
            )}
          </div>

          {/* Medical Notes */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Medical Notes
            </label>
            <textarea
              name="medical_notes"
              value={formData.medical_notes}
              onChange={handleChange}
              rows={2}
              placeholder="Any medical information or special care requirements..."
              className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none ${
                errors.medical_notes ? 'border-red-300' : ''
              }`}
              style={{ borderColor: errors.medical_notes ? '#DC2626' : '#D1D5DB', color: '#1F2937' }}
            />
            {errors.medical_notes && (
              <p className="text-red-600 text-xs mt-1">{errors.medical_notes[0] || errors.medical_notes}</p>
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
              Pet is active (visible to customers)
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
              {loading ? 'Saving...' : (isEditing ? 'Update Pet' : 'Add Pet')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdoptionModal;