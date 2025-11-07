import React, { useState, useEffect, useMemo } from 'react';
import AddAdoptionModal from '../../components/admin/AddAdoptionModal';
import { adoptions } from '../../utils/adoptions';

const ManageAdoptionsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdoption, setEditingAdoption] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Any');
  const [sortBy, setSortBy] = useState('Updated');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(20);

  // State for adoptions and loading
  const [allAdoptions, setAllAdoptions] = useState([]); // Store all adoptions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all adoptions once
  const fetchAdoptions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all adoptions (or a large number)
      const params = {
        page: 1,
        per_page: 1000 // Fetch a large number for client-side filtering
      };
      
      const response = await adoptions.getAll(params);
      
      // Handle paginated response
      if (response.items) {
        setAllAdoptions(response.items);
      } else if (Array.isArray(response)) {
        setAllAdoptions(response);
      } else {
        setAllAdoptions([]);
      }
    } catch (err) {
      console.error('Error fetching adoptions:', err);
      setError(err.message || 'Failed to load adoptions');
      setAllAdoptions([]);
    } finally {
      setLoading(false);
    }
  };

  // Client-side filtering and sorting
  const filteredAndSortedAdoptions = useMemo(() => {
    let filtered = [...allAdoptions];

    // Apply search filter (case-insensitive)
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(adoption => {
        const name = (adoption.name || '').toLowerCase();
        const breed = (adoption.breed || '').toLowerCase();
        const description = (adoption.description || '').toLowerCase();
        const species = (adoption.species || '').toLowerCase();
        
        return name.includes(searchTerm) || 
               breed.includes(searchTerm) || 
               description.includes(searchTerm) ||
               species.includes(searchTerm);
      });
    }

    // Apply species filter
    if (selectedSpecies !== 'All') {
      filtered = filtered.filter(adoption => adoption.species === selectedSpecies);
    }

    // Apply status filter
    if (selectedStatus !== 'Any') {
      filtered = filtered.filter(adoption => adoption.status === selectedStatus);
    }

    // Apply sorting
    switch (sortBy) {
      case 'Name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'Days In':
        filtered.sort((a, b) => {
          const daysA = getDaysIn(a.created_at);
          const daysB = getDaysIn(b.created_at);
          return daysB - daysA; // Most days first
        });
        break;
      case 'Status':
        filtered.sort((a, b) => (a.status || '').localeCompare(b.status || ''));
        break;
      case 'Updated':
      default:
        filtered.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
        break;
    }

    return filtered;
  }, [allAdoptions, searchQuery, selectedSpecies, selectedStatus, sortBy]);

  // Paginate filtered results
  const paginatedAdoptions = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return filteredAndSortedAdoptions.slice(startIndex, endIndex);
  }, [filteredAndSortedAdoptions, currentPage, perPage]);

  // Calculate pagination info
  const pagination = useMemo(() => {
    const totalItems = filteredAndSortedAdoptions.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const from = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
    const to = Math.min(currentPage * perPage, totalItems);

    return {
      total_items: totalItems,
      total_pages: totalPages,
      current_page: currentPage,
      per_page: perPage,
      from,
      to,
      has_previous: currentPage > 1,
      has_next: currentPage < totalPages
    };
  }, [filteredAndSortedAdoptions.length, currentPage, perPage]);

  // Calculate stats from all adoptions
  const stats = useMemo(() => {
    return {
      available: allAdoptions.filter(a => a.status === 'Available').length,
      pending: allAdoptions.filter(a => a.status === 'Pending').length,
      adopted: allAdoptions.filter(a => a.status === 'Adopted').length,
      total: allAdoptions.length
    };
  }, [allAdoptions]);

  // Helper function for days calculation (needs to be defined before useMemo)
  const getDaysIn = (createdAt) => {
    if (!createdAt) return 0;
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Initial load
  useEffect(() => {
    fetchAdoptions();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSpecies, selectedStatus, sortBy]);

  // Refresh when modal closes
  useEffect(() => {
    if (!showAddModal) {
      fetchAdoptions();
    }
  }, [showAddModal]);

  const handleEdit = (adoption) => {
    setEditingAdoption(adoption);
    setShowAddModal(true);
  };

  const handleDelete = async (adoptionId) => {
    if (!window.confirm('Are you sure you want to delete this adoption?')) {
      return;
    }
    
    try {
      await adoptions.delete(adoptionId);
      await fetchAdoptions(); // Refresh all adoptions
    } catch (err) {
      console.error('Error deleting adoption:', err);
      alert(err.message || 'Failed to delete adoption');
    }
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingAdoption(null);
    fetchAdoptions(); // Refresh all adoptions
  };

  const getAdoptionStatus = (status) => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
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
        return {
          text: status || 'Unknown',
          bg: 'bg-gray-100',
          textColor: 'text-gray-700',
          icon: null
        };
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
              <option>All</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
              <option>Bird</option>
              <option>Other</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Any</option>
              <option>Available</option>
              <option>Pending</option>
              <option>Adopted</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              <option>Updated</option>
              <option>Name</option>
              <option>Days In</option>
              <option>Status</option>
            </select>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Available Pets</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.available}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Pending</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.pending}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>This Month</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.adopted}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E5E5' }}>
              <p className="text-sm mb-2" style={{ color: '#6B7280' }}>Total</p>
              <p className="text-3xl font-bold mb-1" style={{ color: '#1F2937' }}>{stats.total}</p>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <p style={{ color: '#6B7280' }}>Loading adoptions...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Adoptions Table */}
          {!loading && !error && (
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
                  {paginatedAdoptions.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center" style={{ color: '#6B7280' }}>
                        No adoptions found
                      </td>
                    </tr>
                  ) : (
                    paginatedAdoptions.map((adoption, index) => {
                      const statusInfo = getAdoptionStatus(adoption.status);
                      const daysIn = adoption.status === 'Adopted' ? 0 : getDaysIn(adoption.created_at);
                      return (
                        <tr key={adoption.id} className={index !== paginatedAdoptions.length - 1 ? 'border-b' : ''} style={{ borderColor: '#E5E5E5' }}>
                          <td className="px-6 py-4">
                            <img
                              src={adoption.image_url || 'https://via.placeholder.com/48?text=No+Image'}
                              alt={adoption.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-medium mb-1" style={{ color: '#1F2937' }}>{adoption.name}</p>
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
                              {daysIn > 0 ? `${daysIn} days` : 'Adopted'}
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
                              <button 
                                onClick={() => handleEdit(adoption)}
                                className="p-2 rounded-lg border hover:bg-gray-50 transition-colors" 
                                style={{ borderColor: '#D1D5DB' }}
                                title="Edit"
                              >
                                <svg className="w-4 h-4" style={{ color: '#374151' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => handleDelete(adoption.id)}
                                className="p-2 rounded-lg border hover:bg-red-50 transition-colors" 
                                style={{ borderColor: '#D1D5DB' }}
                                title="Delete"
                              >
                                <svg className="w-4 h-4" style={{ color: '#DC2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && pagination && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Showing {pagination.from}-{pagination.to} of {pagination.total_items}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={!pagination.has_previous}
                  className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: '#D1D5DB', color: '#374151' }}
                >
                  Prev
                </button>
                {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        currentPage === page ? 'bg-gray-100' : 'hover:bg-gray-50'
                      }`}
                      style={{ borderColor: '#D1D5DB', color: '#374151' }}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!pagination.has_next}
                  className="px-4 py-2 rounded-lg border text-sm font-medium transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: '#D1D5DB', color: '#374151' }}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add/Edit Adoption Modal */}
      {showAddModal && (
        <AddAdoptionModal 
          onClose={handleModalClose}
          adoption={editingAdoption}
        />
      )}
    </div>
  );
};

export default ManageAdoptionsPage;