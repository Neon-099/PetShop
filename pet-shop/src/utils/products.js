import { api, apiGet } from './api';

export const products = {
  /**
   * Get all products with filters and pagination
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @param {string} params.category - Filter by category
   * @param {string} params.search - Search query
   * @param {number} params.is_active - Filter by active status (0 or 1)
   */
  async getAll(params = {}) {
    const queryParams = new URLSearchParams();
    
    if (params.page) queryParams.append('page', params.page);
    if (params.per_page) queryParams.append('per_page', params.per_page);
    if (params.category) queryParams.append('category', params.category);
    if (params.search) queryParams.append('search', params.search);
    if (params.is_active !== undefined) queryParams.append('is_active', params.is_active);
    
    const queryString = queryParams.toString();
    const path = `/api/products${queryString ? `?${queryString}` : ''}`;
    
    return apiGet.get(path);
  },

  /**
   * Get single product by ID
   * @param {number} id - Product ID
   */
  async getById(id) {
    return apiGet.get(`/api/products/${id}`);
  },

  /**
   * Create new product (Admin only)
   * @param {Object} productData - Product data
   */
  async create(productData) {
    return apiGet.post('/api/products', productData);
  },

  /**
   * Update product (Admin only)
   * @param {number} id - Product ID
   * @param {Object} productData - Updated product data
   */
  async update(id, productData) {
    return apiGet.put(`/api/products/${id}`, productData);
  },

  /**
   * Delete product (Admin only)
   * @param {number} id - Product ID
   */
  async delete(id) {
    return apiGet.delete(`/api/products/${id}`);
  }
};
