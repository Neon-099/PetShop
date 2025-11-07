import React from 'react';
import { X, PawPrint, MapPin, Calendar, Ruler, Heart, Info } from 'lucide-react';

const AdoptionDetailsModal = ({ isOpen, onClose, pet, onApply }) => {
  if (!isOpen || !pet) return null;

  const formatAge = (age) => {
    if (!age) return 'Unknown';
    if (typeof age === 'number') {
      if (age < 1) return `${Math.round(age * 12)} months`;
      return `${age} ${age === 1 ? 'year' : 'years'}`;
    }
    return age;
  };

  const petName = pet.pet_name || pet.name || 'Unknown';
  const breed = pet.breed || 'Unknown';
  const age = formatAge(pet.age);
  const gender = pet.gender || 'Unknown';
  const size = pet.size || 'Unknown';
  const color = pet.color || 'Not specified';
  const location = pet.location || 'Not specified';
  const description = pet.description || 'No description available.';
  const personality = pet.personality || 'Not specified';
  const medicalNotes = pet.medical_notes || null;
  const status = pet.status || 'Available';
  const imageUrl = pet.image_url || 'https://via.placeholder.com/600x400?text=Pet+Image';

  return (
    <div
      className="fixed backdrop-blur-sm bg-black-30 inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
        style={{ backgroundColor: '#FEFBF6' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b z-10" style={{ backgroundColor: '#FEFBF6', borderColor: '#E5E5E5' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#14B8A6' }}>
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Pet Details</h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Learn more about {petName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: '#6B7280' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image */}
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden" style={{ border: '1px solid #E5E5E5' }}>
                <img
                  src={imageUrl}
                  alt={petName}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=Pet+Image';
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: status === 'Available' ? '#14B8A6' : status === 'Adopted' ? '#6B7280' : '#F59E0B' }}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg p-4" style={{ backgroundColor: '#F0FDFA', border: '1px solid #14B8A6' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" style={{ color: '#14B8A6' }} />
                    <span className="text-xs font-medium" style={{ color: '#6B7280' }}>Age</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{age}</p>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: '#F0FDFA', border: '1px solid #14B8A6' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4" style={{ color: '#14B8A6' }} />
                    <span className="text-xs font-medium" style={{ color: '#6B7280' }}>Size</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{size}</p>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: '#F0FDFA', border: '1px solid #14B8A6' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4" style={{ color: '#14B8A6' }} />
                    <span className="text-xs font-medium" style={{ color: '#6B7280' }}>Gender</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{gender}</p>
                </div>
                <div className="rounded-lg p-4" style={{ backgroundColor: '#F0FDFA', border: '1px solid #14B8A6' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4" style={{ color: '#14B8A6' }} />
                    <span className="text-xs font-medium" style={{ color: '#6B7280' }}>Location</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>{location}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-6">
              {/* Name and Breed */}
              <div>
                <h3 className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }}>{petName}</h3>
                <p className="text-lg mb-4" style={{ color: '#6B7280' }}>
                  {breed} • {pet.species || 'Pet'}
                </p>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: '#1F2937' }}>
                  <Info className="w-5 h-5" style={{ color: '#14B8A6' }} />
                  About {petName}
                </h4>
                <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
                  {description}
                </p>
              </div>

              {/* Personality */}
              <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: '#1F2937' }}>
                  <Heart className="w-5 h-5" style={{ color: '#14B8A6' }} />
                  Personality
                </h4>
                <p className="text-base" style={{ color: '#374151' }}>
                  {personality}
                </p>
              </div>

              {/* Additional Details */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E5E5' }}>
                <h4 className="text-lg font-semibold mb-3" style={{ color: '#1F2937' }}>Additional Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Color:</span>
                    <span className="font-medium" style={{ color: '#1F2937' }}>{color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Species:</span>
                    <span className="font-medium" style={{ color: '#1F2937' }}>{pet.species || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#6B7280' }}>Status:</span>
                    <span className="font-medium" style={{ color: '#1F2937' }}>{status}</span>
                  </div>
                </div>
              </div>

              {/* Medical Notes */}
              {medicalNotes && (
                <div className="rounded-lg p-4" style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B' }}>
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: '#1F2937' }}>
                    <Info className="w-5 h-5" style={{ color: '#F59E0B' }} />
                    Medical Notes
                  </h4>
                  <p className="text-sm" style={{ color: '#374151' }}>
                    {medicalNotes}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                {status === 'Available' && (
                  <button
                    onClick={() => {
                      onApply();
                      onClose();
                    }}
                    className="w-full px-6 py-3 rounded-lg text-white hover:opacity-90 transition-colors font-medium flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#14B8A6' }}
                  >
                    <PawPrint className="w-5 h-5" />
                    Apply to Adopt {petName}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetailsModal;