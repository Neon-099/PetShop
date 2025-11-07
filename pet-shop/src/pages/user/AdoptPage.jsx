import React, { useState, useEffect } from 'react';
import { PawPrint } from 'lucide-react';
import AdoptionApplicationModal from '../../components/user/AdoptionApplicationModal';
import AdoptionDetailsModal from '../../components/user/AdoptionDetailsModal';
import { adoptions } from '../../utils/adoptions';

const AdoptPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Pets');
  const [selectedAge, setSelectedAge] = useState('Any Age');
  const [selectedSize, setSelectedSize] = useState('Any Size');
  const [showAdoptionApplicationModal, setShowAdoptionApplicationModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showAdoptionDetailsModal, setShowAdoptionDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [featuredPet, setFeaturedPet] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, per_page: 12 });

  const petTypes = ['All Pets', 'Dog', 'Cat', 'Bird', 'Rabbit', 'Other'];
  const ageOptions = ['Any Age', 'Puppy/Kitten', 'Young (1-3 years)', 'Adult (4-7 years)', 'Senior (8+ years)'];
  const sizeOptions = ['Any Size', 'Small', 'Medium', 'Large'];

  useEffect(() => {
    fetchAdoptions();
  }, [currentPage, selectedType, searchQuery]);

  const fetchAdoptions = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        per_page: 12,
        status: 'Available',
        is_active: 1
      };

      if (selectedType !== 'All Pets') {
        params.species = selectedType;
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await adoptions.getAll(params);
      
      // Handle different response structures
      const data = response.adoptions || response.data || response;
      const items = Array.isArray(data) ? data : (data.items || []);
      
      setPets(items);
      
      // Set featured pet (first available pet)
      if (items.length > 0 && !featuredPet) {
        setFeaturedPet(items[0]);
      }
      
      if (response.pagination) {
        setPagination(response.pagination);
      } else if (response.total !== undefined) {
        setPagination({
          total: response.total,
          per_page: params.per_page
        });
      }
    } catch (error) {
      console.error('Error fetching adoptions:', error);
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (pet) => {
    setSelectedPet(pet);
    setShowAdoptionDetailsModal(true);
  };

  const formatAge = (age) => {
    if (!age) return 'Unknown';
    if (typeof age === 'number') {
      if (age < 1) return `${Math.round(age * 12)} months`;
      return `${age} ${age === 1 ? 'year' : 'years'}`;
    }
    return age;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFBF6' }}>
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
            <button 
              className="px-4 py-2 rounded-lg text-white hover:opacity-90 transition-colors flex items-center gap-2 text-sm font-medium" 
              style={{ backgroundColor: '#14B8A6' }}
              onClick={() => setShowAdoptionApplicationModal(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Submit Adoption Application
            </button>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search pets by name, breed, or personality..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#6B7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              className="px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium" 
              style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}
              onClick={() => {
                setSelectedType(selectedType === 'All Pets' ? 'Dog' : selectedType === 'Dog' ? 'Cat' : 'All Pets');
                setCurrentPage(1);
              }}
            >
              <span>Type: {selectedType}</span>
            </button>
          </div>
        </div>

        {/* Featured Pet Spotlight */}
        {featuredPet && (
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
                    src={featuredPet.image_url || 'https://via.placeholder.com/600x400?text=Featured+Pet'}
                    alt={featuredPet.pet_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x400?text=Featured+Pet';
                    }}
                  />
                </div>
                <div className="p-8 flex flex-col justify-center" style={{ backgroundColor: '#FEFBF6' }}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 mb-4 w-fit">
                    <PawPrint className="w-4 h-4" style={{ color: '#14B8A6' }} />
                    <span className="text-xs font-medium" style={{ color: '#14B8A6' }}>Pet of the Week</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2" style={{ color: '#1F2937' }}>{featuredPet.pet_name}</h3>
                  <p className="text-lg mb-4" style={{ color: '#6B7280' }}>
                    {featuredPet.breed} • {formatAge(featuredPet.age)} • {featuredPet.size}
                  </p>
                  <p className="text-base mb-6" style={{ color: '#374151' }}>
                    {featuredPet.description || featuredPet.personality || 'A wonderful companion looking for a loving home.'}
                  </p>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleViewDetails(featuredPet)}
                      className="px-6 py-3 rounded-lg text-white hover:opacity-90 transition-colors font-medium" 
                      style={{ backgroundColor: '#14B8A6' }}
                    >
                      Meet {featuredPet.pet_name}
                    </button>
                    <button 
                      onClick={() => handleViewDetails(featuredPet)}
                      className="px-6 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium" 
                      style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p style={{ color: '#6B7280' }}>Loading pets...</p>
          </div>
        )}

        {/* Pets Grid */}
        {!loading && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-1" style={{ color: '#1F2937' }}>Available Pets</h2>
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  {pagination.total || pets.length} pets waiting for their forever homes
                </p>
              </div>
            </div>

            {pets.length === 0 ? (
              <div className="text-center py-12">
                <p style={{ color: '#6B7280' }}>No pets available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => (
                  <div
                    key={pet.id}
                    className="rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}
                  >
                    <div className="relative">
                      <img
                        src={pet.image_url || 'https://via.placeholder.com/400x300?text=Pet'}
                        alt={pet.pet_name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400x300?text=Pet';
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: '#14B8A6' }}>
                          {pet.status || 'Available'}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold mb-1" style={{ color: '#1F2937' }}>
                            {pet.pet_name}
                          </h3>
                          <p className="text-sm mb-1" style={{ color: '#6B7280' }}>
                            {pet.breed} • {formatAge(pet.age)}
                          </p>
                          <p className="text-xs" style={{ color: '#9CA3AF' }}>
                            {pet.size} • {pet.personality || 'Friendly'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <button 
                          onClick={() => handleViewDetails(pet)}
                          className="flex-1 px-4 py-2.5 rounded-lg text-white hover:opacity-90 transition-colors text-sm font-medium" 
                          style={{ backgroundColor: '#14B8A6' }}
                        >
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
            )}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.total > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: '#6B7280' }}>
              Showing {((currentPage - 1) * pagination.per_page) + 1}-{Math.min(currentPage * pagination.per_page, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}
              >
                Prev
              </button>
              {Array.from({ length: Math.ceil(pagination.total / pagination.per_page) }, (_, i) => i + 1)
                .slice(Math.max(0, currentPage - 2), currentPage + 3)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'text-gray-800 bg-gray-100'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{ border: '1px solid #D1D5DB' }}
                  >
                    {page}
                  </button>
                ))}
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={currentPage >= Math.ceil(pagination.total / pagination.per_page)}
                className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#FEFBF6', border: '1px solid #D1D5DB' }}
              >
                Next
              </button>
            </div>
          </div>
        )}

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
          onClose={() => {
            setShowAdoptionApplicationModal(false);
            setSelectedPet(null);
          }}
          pet={selectedPet}
        />
      )}

      {showAdoptionDetailsModal && (
        <AdoptionDetailsModal 
          isOpen={showAdoptionDetailsModal}
          onClose={() => setShowAdoptionDetailsModal(false)}
          onApply={() => setShowAdoptionApplicationModal(true)}
          pet={selectedPet}
        />
      )}
    </div>
  );
};

export default AdoptPage;