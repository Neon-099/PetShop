import React, { useState } from 'react';

const AddAdoptionModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    petName: '',
    species: '',
    breed: '',
    age: '',
    gender: '',
    size: '',
    color: '',
    location: '',
    description: '',
    personality: '',
    medicalNotes: '',
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
          <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Add New Pet for Adoption</h2>
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
          {/* Pet Image */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Pet Photo
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
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Pet Name and Species */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                Pet Name *
              </label>
              <input
                type="text"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                required
                placeholder="Enter pet name"
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              />
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
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Bird">Bird</option>
                <option value="Other">Other</option>
              </select>
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
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              />
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
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              />
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
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
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
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              >
                <option value="">Select</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
              </select>
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
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Location/Shelter *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Shelter A"
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
              placeholder="Tell us about this pet..."
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
            />
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
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
            />
          </div>

          {/* Medical Notes */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
              Medical Notes
            </label>
            <textarea
              name="medicalNotes"
              value={formData.medicalNotes}
              onChange={handleChange}
              rows={2}
              placeholder="Any medical information or special care requirements..."
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              style={{ borderColor: '#D1D5DB', color: '#1F2937' }}
            />
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
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdoptionModal;