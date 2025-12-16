import { api, apiGet } from './api';

// Sample demo products data
const sampleProducts = [
  {
    id: 1,
    name: 'Premium Dog Food',
    description: 'High-quality nutrition for your furry friend',
    category: 'Food',
    price: 29.99,
    quantity: 50,
    image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400',
    is_active: 1
  },
  {
    id: 2,
    name: 'Interactive Cat Toy',
    description: 'Keeps your cat entertained for hours',
    category: 'Toys',
    price: 15.99,
    quantity: 30,
    image_url: 'https://mobileimages.lowes.com/productimages/5ca6f5bf-0937-4734-b7d1-f0be1ab66968/41374817.jpg',
    is_active: 1
  },
  {
    id: 3,
    name: 'Dog Leash & Collar Set',
    description: 'Durable and comfortable walking accessories',
    category: 'Accessories',
    price: 24.99,
    quantity: 45,
    image_url: 'https://m.media-amazon.com/images/I/71RgH9AogIL._AC_SL1500_.jpg',
    is_active: 1
  },
  {
    id: 4,
    name: 'Pet Vitamins',
    description: 'Essential vitamins for pet health',
    category: 'Health',
    price: 19.99,
    quantity: 25,
    image_url: 'https://a.storyblok.com/f/125940/3000x3000/41652f29bf/probiotic_chews.jpg/m/3840x0',
    is_active: 1
  },
  {
    id: 5,
    name: 'Pet Shampoo',
    description: 'Gentle cleansing formula for pets',
    category: 'Grooming',
    price: 12.99,
    quantity: 40,
    image_url: 'https://www.petwarehouse.ph/23613-thickbox_default/doggo-anti-parasitic-pet-shampoo.jpg',
    is_active: 1
  },
  {
    id: 6,
    name: 'Cat Scratching Post',
    description: 'Saves your furniture from scratches',
    category: 'Toys',
    price: 34.99,
    quantity: 20,
    image_url: 'https://mobileimages.lowes.com/productimages/b753ddac-f5a6-4360-92e0-c8daeb06379a/65545268.jpg?size=pdhism',
    is_active: 1
  },
  {
    id: 7,
    name: 'Dog Treats',
    description: 'Delicious training treats',
    category: 'Food',
    price: 8.99,
    quantity: 60,
    image_url: 'https://cdn.shopify.com/s/files/1/0386/4113/9843/files/lorikeet_5b7565c3-e268-4c09-9abb-5d18eb327d8c_480x480.png?v=1646027226',
    is_active: 1
  },
  {
    id: 8,
    name: 'Pet Bed',
    description: 'Comfortable sleeping space for your pet',
    category: 'Accessories',
    price: 49.99,
    quantity: 15,
    image_url: 'https://www.ikea.com/ph/en/images/products/utsadd-pet-bed-light-gray__1239831_pe919128_s5.jpg',
    is_active: 1
  },
  {
    id: 9,
    name: 'Bird Cage',
    description: 'Spacious home for your feathered friend',
    category: 'Accessories',
    price: 79.99,
    quantity: 10,
    image_url: 'https://t3.ftcdn.net/jpg/05/22/76/90/360_F_522769035_eobuSV7ZTXfSQYVjNfspqX1jzbbvgGl1.jpg',
    is_active: 1
  },
  {
    id: 10,
    name: 'Pet Brush',
    description: 'Keeps your pet\'s coat shiny and healthy',
    category: 'Grooming',
    price: 14.99,
    quantity: 35,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptZY6EXMUEhKhTRJ8bM_s6Q6qlQosxWUqTA&s',
    is_active: 1
  },
  {
    id: 11,
    name: 'Fish Tank Filter',
    description: 'Keeps aquarium water clean',
    category: 'Accessories',
    price: 39.99,
    quantity: 8,
    image_url: 'https://www.digiten.shop/cdn/shop/products/ato19s_1024x1024@2x.jpg?v=1626847805',
    is_active: 1
  },
  {
    id: 12,
    name: 'Rabbit Hay',
    description: 'Fresh hay for small pets',
    category: 'Food',
    price: 9.99,
    quantity: 50,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7eOYtnLtRK-GC3sb02lAwG981REZ8cZq6iw&s',
    is_active: 1
  }
];

export const products = {
  /**
   * Get all products with filters and pagination (DEMO MODE - returns sample data)
   * @param {Object} params - Query parameters
   * @param {number} params.page - Page number
   * @param {number} params.per_page - Items per page
   * @param {string} params.category - Filter by category
   * @param {string} params.search - Search query
   * @param {number} params.is_active - Filter by active status (0 or 1)
   */
  async getAll(params = {}) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...sampleProducts];
    
    // Filter by active status
    if (params.is_active !== undefined) {
      filtered = filtered.filter(p => p.is_active === params.is_active);
    }
    
    // Filter by category
    if (params.category && params.category !== 'All Categories') {
      filtered = filtered.filter(p => p.category === params.category);
    }
    
    // Filter by search query
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Pagination
    const page = params.page || 1;
    const perPage = params.per_page || 12;
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    
    return {
      items: paginatedItems,
      total: filtered.length,
      page: page,
      per_page: perPage,
      pagination: {
        total: filtered.length,
        per_page: perPage,
        current_page: page,
        last_page: Math.ceil(filtered.length / perPage)
      }
    };
  },

  /**
   * Get single product by ID
   * @param {number} id - Product ID
   */
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const product = sampleProducts.find(p => p.id === parseInt(id));
    return product || null;
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