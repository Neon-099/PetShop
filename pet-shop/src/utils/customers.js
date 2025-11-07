import { api, apiGet } from './api';

export const customers = {
  /**
   * Get all customers with filters and pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @param {string} params.search - Search query
   * @param {string} params.status - Filter by status (active/inactive)
   */
  async getAll(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.per_page) queryParams.append('per_page', params.per_page);
    if (params.search) queryParams.append('search', params.search);
    if (params.status) queryParams.append('status', params.status);
    
    const queryString = queryParams.toString();
    const path = `/api/customers${queryString ? `?${queryString}` : ''}`;
    
    return apiGet.get(path);
  },

  /**
   * Get single customer by ID
   * @param {number} id - Customer ID (user_id)
   */
  async getById(id) {
    return apiGet.get(`/api/customers/${id}`);
  },

  /**
   * Update customer (Admin only)
   * @param {number} id - Customer ID (user_id)
   * @param {Object} customerData - Updated customer data
   */
  async update(id, customerData) {
    return apiGet.put(`/api/customers/${id}`, customerData);
  },

  /**
   * Delete customer (Admin only) - soft delete by setting is_active to 0
   * @param {number} id - Customer ID (user_id)
   */
  async delete(id) {
    return apiGet.delete(`/api/customers/${id}`);
  }
};