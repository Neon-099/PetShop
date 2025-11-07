import { api, apiGet } from './api';

export const adoptions = {
  /**
   * Get all adoptions with filters and pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @param {string} params.species - Filter by species
   * @param {string} params.status - Filter by status (Available, Adopted, Pending)
   * @param {string} params.location - Filter by location
   * @param {string} params.search - Search query
   * @param {number} params.is_active - Filter by active status (0 or 1)
   */
  async getAll(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.per_page) queryParams.append('per_page', params.per_page);
    if (params.species) queryParams.append('species', params.species);
    if (params.status) queryParams.append('status', params.status);
    if (params.location) queryParams.append('location', params.location);
    if (params.search) queryParams.append('search', params.search);
    if (params.is_active !== undefined) queryParams.append('is_active', params.is_active);
    
    const queryString = queryParams.toString();
    const path = `/api/adoptions${queryString ? `?${queryString}` : ''}`;
    
    return apiGet.get(path);
  },

  /**
   * Get single adoption by ID
   * @param {number} id - Adoption ID
   */
  async getById(id) {
    return apiGet.get(`/api/adoptions/${id}`);
  },

  /**
   * Create new adoption (Admin only)
   * @param {Object} adoptionData - Adoption data
   */
  async create(adoptionData) {
    return apiGet.post('/api/adoptions', adoptionData);
  },

  /**
   * Update adoption (Admin only)
   * @param {number} id - Adoption ID
   * @param {Object} adoptionData - Updated adoption data
   */
  async update(id, adoptionData) {
    return apiGet.put(`/api/adoptions/${id}`, adoptionData);
  },

  /**
   * Delete adoption (Admin only)
   * @param {number} id - Adoption ID
   */
  async delete(id) {
    return apiGet.delete(`/api/adoptions/${id}`);
  }
};