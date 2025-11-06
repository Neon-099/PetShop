import React, { useState } from 'react';
import AddAdoptionModal from '../../components/admin/AddAdoptionModal';

const ManageAdoptionsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Adoptions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Updated');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample adoption data
  const adoptions = [
    {
      id: 1,
      petName: 'Luna',
      breed: 'Golden Retriever',
      age: '2 years',
      gender: 'Female',
      size: 'Large',
      status: 'available',
      location: 'Shelter A',
      daysIn: 45,
      image: 'https://via.placeholder.com/48?text=Luna'
    },
    {
      id: 2,
      petName: 'Milo',
      breed: 'Tabby Cat',
      age: '1 year',
      gender: 'Male',
      size: 'Medium',
      status: 'pending',
      location: 'Shelter B',
      daysIn: 12,
      image: 'https://via.placeholder.com/48?text=Milo'
    },
    {
      id: 3,
      petName: 'Clover',
      breed: 'Holland Lop',
      age: '8 months',
      gender: 'Female',
      size: 'Small',
      status: 'available',
      location: 'Shelter C',
      daysIn: 30,
      image: 'https://via.placeholder.com/48?text=Clover'
    },
    {
      id: 4,
      petName: 'Rio',
      breed: 'African Grey',
      age: '3 years',
      gender: 'Male',
      size: 'Medium',
      status: 'adopted',
      location: 'Shelter A',
      daysIn: 0,
      image: 'https://via.placeholder.com/48?text=Rio'
    },
    {
      id: 5,
      petName: 'Bella',
      breed: 'Labrador Mix',
      age: '4 years',
      gender: 'Female',
      size: 'Large',
      status: 'available',
      location: 'Shelter B',
      daysIn: 67,
      image: 'https://via.placeholder.com/48?text=Bella'
    }
  ];

  const getAdoptionStatus = (status) => {
    switch (status) {
      case 'available':
        return {
          text: 'Available',
          bg: 'bg-green-100',
          textColor: 'text-green-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )
        };
      case 'pending':
        return {
          text: 'Pending',
          bg: 'bg-yellow-100',
          textColor: 'text-yellow-700',
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )
        };
      case 'adopted':
        return {
          text: 'Adopted',
          bg: 'bg-blue-100',
          textColor: 'text-blue-700',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )
        };
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FDFBF8' }}>
      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Top Header */}
        <header className="px-8 py-6 border-b" style={{ borderColor: '#E5E5E5' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>Adoptions</h1>
              <p className="text-sm" style={{ color: '#6B7280' }}>Manage pets available for adoption and track adoption status</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium transition-colors hover:bg-gray-50" style={{ borderColor: '#D1D5DB', color: '#374151' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Import
              </button>
              <button className="px-4 py-2 rounded-lg border flex items-center gap-2 text-sm font-medium transition-colors hover:bg-gray-50" style={{ borderColor: '#D1D5DB', color: '#374151' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center gap-2 text-sm"
                style={{ backgroundColor: '#5C86E5' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#4A6FD4'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#5C86E5'}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Adoption
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Search and Filters */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search pets by name or breed..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                style={{ borderColor: '#D1D5DB' }}
              />
              <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#9CA3AF' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Species: All</option>
              <option>Species: Dog</option>
              <option>Species: Cat</option>
              <option>Species: Rabbit</option>
              <option>Species: Bird</option>
              <option>Species: Other</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Status: Any</option>
              <option>Status: Available</option>
              <option>Status: Pending</option>
              <option>Status: Adopted</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Sort: Updated</option>
              <option>Sort: Name</option>
              <option>Sort: Days In</option>
              <option>Sort: Status</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Available Pets</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>64</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#28A745' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ready for adoption
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Pending</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>12</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#FFC107' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Under review
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>This Month</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>18</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#5C86E5' }}>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Successful adoptions
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Avg. Wait Time</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>32 days</p>
              <p className="text-xs flex items-center gap-1" style={{ color: '#6B7280' }}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Until adoption
              </p>
            </div>
          </div>

          {/* Adoptions Table */}
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: '#E5E5E5' }}>
            <table className="w-full">
              <thead style={{ backgroundColor: '#F9FAFB' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Photo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Pet</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Days In</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {adoptions.map((adoption, index) => {
                  const statusInfo = getAdoptionStatus(adoption.status);
                  return (
                    <tr key={adoption.id} className={index !== adoptions.length - 1 ? 'border-b' : ''} style={{ borderColor: '#E5E5E5' }}>
                      <td className="px-6 py-4">
                        <img
                          src={adoption.image}
                          alt={adoption.petName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium mb-1" style={{ color: '#1F2937' }}>{adoption.petName}</p>
                        <p className="text-xs" style={{ color: '#6B7280' }}>{adoption.breed}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <p className="text-xs" style={{ color: '#6B7280' }}>{adoption.age} • {adoption.gender}</p>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ backgroundColor: '#FDFBF8', color: '#374151' }}>
                            {adoption.size}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium" style={{ color: '#1F2937' }}>{adoption.location}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>
                          {adoption.daysIn > 0 ? `${adoption.daysIn} days` : 'Adopted'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.textColor}`}>
                          {statusInfo.icon}
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: '#D1D5DB' }}>
                            <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" style={{ borderColor: '#D1D5DB' }}>
                            <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm" style={{ color: '#6B7280' }}>Showing 1-5 of 64</p>
            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  currentPage === 1 ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button
                className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50"
                style={{ borderColor: '#D1D5DB', color: '#374151' }}
                disabled={currentPage === 64 / 5}
              >
                Next
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Add Adoption Modal */}
      {showAddModal && (
        <AddAdoptionModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default ManageAdoptionsPage;