import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';
import AdoptionApplicationModal from '../../components/user/AdoptionApplicationModal';

const AdoptPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Pets');
  const [selectedAge, setSelectedAge] = useState('Any Age');
  const [selectedSize, setSelectedSize] = useState('Any Size');
  const [showAdoptionApplicationModal, setShowAdoptionApplicationModal] = useState(false);

  // Sample pets data - replace with actual API calls
  const pets = [
    {
      id: 1,
      name: 'Bella',
      type: 'Dog',
      breed: 'Golden Retriever',
      age: '2 years',
      size: 'Large',
      personality: 'Friendly, Playful',
      image: 'https://via.placeholder.com/400x300?text=Bella+Golden+Retriever',
      status: 'Available'
    },
    {
      id: 2,
      name: 'Milo',
      type: 'Cat',
      breed: 'Tabby',
      age: '1 year',
      size: 'Medium',
      personality: 'Playful, Curious',
      image: 'https://via.placeholder.com/400x300?text=Milo+Tabby',
      status: 'Available'
    },
    {
      id: 3,
      name: 'Clover',
      type: 'Rabbit',
      breed: 'Mixed',
      age: '8 months',
      size: 'Small',
      personality: 'Calm, Gentle',
      image: 'https://via.placeholder.com/400x300?text=Clover+Rabbit',
      status: 'Available'
    },
    {
      id: 4,
      name: 'Rio',
      type: 'Bird',
      breed: 'Parrot',
      age: '3 years',
      size: 'Medium',
      personality: 'Talkative, Social',
      image: 'https://via.placeholder.com/400x300?text=Rio+Parrot',
      status: 'Available'
    },
    {
      id: 5,
      name: 'Luna',
      type: 'Dog',
      breed: 'Labrador',
      age: '1.5 years',
      size: 'Large',
      personality: 'Energetic, Loyal',
      image: 'https://via.placeholder.com/400x300?text=Luna+Labrador',
      status: 'Available'
    },
    {
      id: 6,
      name: 'Whiskers',
      type: 'Cat',
      breed: 'Persian',
      age: '3 years',
      size: 'Medium',
      personality: 'Calm, Affectionate',
      image: 'https://via.placeholder.com/400x300?text=Whiskers+Persian',
      status: 'Available'
    }
  ];

  const petTypes = ['All Pets', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const ageOptions = ['Any Age', 'Puppy/Kitten', 'Young (1-3 years)', 'Adult (4-7 years)', 'Senior (8+ years)'];
  const sizeOptions = ['Any Size', 'Small', 'Medium', 'Large'];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFBF6' }}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>Adopt a Pet</h1>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Find your perfect companion and give them a loving home
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#14B8A6' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <button
              onClick={() => setShowAdoptionApplicationModal(true)}
                >
                    Submit Adoption Application
                </button>
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search pets by name, breed, or personality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Type: {selectedType}</span>
            </button>
            <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Age: {selectedAge}</span>
            </button>
            <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Size: {selectedSize}</span>
            </button>
          </div>
        </div>

        {/* Featured Pet Spotlight */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ color: '#1F2937' }}>
                Featured Pet of the Week
              </h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Meet our special friend looking for a forever home
              </p>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative">
                <img
                  src="https://via.placeholder.com/600x400?text=Featured+Pet+Bella"
                  alt="Featured Pet"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center" style={{ backgroundColor: '#FEFBF6' }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 mb-4 w-fit">
                  <PawPrint className="w-4 h-4" style={{ color: '#14B8A6' }} />
                  <span className="text-xs font-medium" style={{ color: '#14B8A6' }}>Pet of the Week</span>
                </div>
                <h3 className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }}>Bella</h3>
                <p className="text-lg mb-4" style={{ color: '#6B7280' }}>Golden Retriever • 2 years • Large</p>
                <p className="text-base mb-6" style={{ color: '#374151' }}>
                  Bella is a gentle and playful Golden Retriever who loves spending time with kids. 
                  She enjoys fetch, belly rubs, and long walks. Perfect for families looking for a 
                  loyal and friendly companion.
                </p>
                <div className="flex items-center gap-3">
                  <button className="px-6 py-3 rounded-lg text-white hover:opacity-90 transition-colors font-medium" style={{ backgroundColor: '#14B8A6' }}>
                    Meet Bella
                  </button>
                  <button className="px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pets Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1" style={{ color: '#1F2937' }}>Available Pets</h2>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                {pets.length} pets waiting for their forever homes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <div
                key={pet.id}
                className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}
              >
                <div className="relative">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#14B8A6' }}>
                      {pet.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold mb-1" style={{ color: '#1F2937' }}>
                        {pet.name}
                      </h3>
                      <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
                        {pet.breed} • {pet.age}
                      </p>
                      <p className="text-xs" style={{ color: '#9CA3AF' }}>
                        {pet.size} • {pet.personality}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <button className="flex-1 px-4 py-2.5 rounded-lg text-white hover:opacity-90 transition-colors text-sm font-medium" style={{ backgroundColor: '#14B8A6' }}>
                      View Details
                    </button>
                    <button className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center" style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adoption Process Info */}
        <div className="rounded-xl p-6 mb-8" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Adoption Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: '1', title: 'Browse', desc: 'Explore available pets' },
              { step: '2', title: 'Apply', desc: 'Submit adoption form' },
              { step: '3', title: 'Meet', desc: 'Visit and meet the pet' },
              { step: '4', title: 'Adopt', desc: 'Take your new friend home' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold" style={{ backgroundColor: '#14B8A6' }}>
                  {item.step}
                </div>
                <h4 className="font-semibold mb-1" style={{ color: '#1F2937' }}>{item.title}</h4>
                <p className="text-xs" style={{ color: '#6B7280' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

        {showAdoptionApplicationModal && (
            <AdoptionApplicationModal
            isOpen={showAdoptionApplicationModal}
            onClose={() => setShowAdoptionApplicationModal(false)}
            />
        )}
    </div>
  );
};

export default AdoptPage;