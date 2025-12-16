import { api, apiGet } from './api';

// Sample demo adoptions data
const sampleAdoptions = [
  {
    id: 1,
    pet_name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 2,
    size: 'Large',
    personality: 'Friendly and energetic',
    description: 'Buddy is a loving and playful Golden Retriever looking for an active family. He loves playing fetch and going on long walks.',
    status: 'Available',
    image_url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
    is_active: 1
  },
  {
    id: 2,
    pet_name: 'Luna',
    species: 'Cat',
    breed: 'Persian',
    age: 1.5,
    size: 'Small',
    personality: 'Calm and affectionate',
    description: 'Luna is a beautiful Persian cat who enjoys cuddling and quiet time. Perfect for a calm household.',
    status: 'Available',
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpLcxauHfZ9JqQ1npOy9U21D8Zu4KgKa8LRw&s',
    is_active: 1
  },
  {
    id: 3,
    pet_name: 'Max',
    species: 'Dog',
    breed: 'Beagle',
    age: 3,
    size: 'Medium',
    personality: 'Playful and curious',
    description: 'Max is an energetic Beagle who loves exploring and playing with kids. Great family dog!',
    status: 'Available',
    image_url: 'https://www.zooplus.ie/magazine/wp-content/uploads/2018/05/2-Jahre-Beagle.webp',
    is_active: 1
  },
  {
    id: 4,
    pet_name: 'Whiskers',
    species: 'Cat',
    breed: 'Siamese',
    age: 2,
    size: 'Small',
    personality: 'Vocal and social',
    description: 'Whiskers is a talkative Siamese cat who loves attention and conversation. Very social and friendly.',
    status: 'Available',
    image_url: 'https://pet-health-content-media.chewy.com/wp-content/uploads/2025/04/16210543/202504bec-siamese-cat-1024x548.jpg',
    is_active: 1
  },
  {
    id: 5,
    pet_name: 'Charlie',
    species: 'Dog',
    breed: 'Labrador',
    age: 1,
    size: 'Large',
    personality: 'Energetic and loyal',
    description: 'Charlie is a young Labrador full of energy. Perfect for an active owner who loves outdoor activities.',
    status: 'Available',
    image_url: 'https://www.bonza.dog/wp-content/uploads/Labrador-Dog-Health-Issues-Comprehensive-Guide-to-Common-Problems.webp',
    is_active: 1
  },
  {
    id: 6,
    pet_name: 'Mittens',
    species: 'Cat',
    breed: 'Maine Coon',
    age: 4,
    size: 'Large',
    personality: 'Gentle giant',
    description: 'Mittens is a large Maine Coon with a gentle personality. Great with children and other pets.',
    status: 'Available',
    image_url: 'https://i0.wp.com/sassykoonz.com/wp-content/uploads/2021/06/maine-coon-adult-orange-male-i-am-legned-4-years-old-683x1024.jpg?resize=683%2C1024&ssl=1',
    is_active: 1
  },
  {
    id: 7,
    pet_name: 'Rocky',
    species: 'Dog',
    breed: 'Bulldog',
    age: 5,
    size: 'Medium',
    personality: 'Calm and protective',
    description: 'Rocky is a calm and protective Bulldog. He\'s great with families and loves to relax.',
    status: 'Available',
    image_url: 'https://cdn.britannica.com/07/234207-050-0037B589/English-bulldog-dog.jpg',
    is_active: 1
  },
  {
    id: 8,
    pet_name: 'Snowball',
    species: 'Rabbit',
    breed: 'Angora',
    age: 1,
    size: 'Small',
    personality: 'Gentle and quiet',
    description: 'Snowball is a fluffy Angora rabbit who loves to be petted. Perfect for a quiet home.',
    status: 'Available',
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlCtQ140LV9HjrWE0slJ_1KWTSpcW_6oPQQ&s',
    is_active: 1
  },
  {
    id: 9,
    pet_name: 'Tweety',
    species: 'Bird',
    breed: 'Canary',
    age: 0.5,
    size: 'Small',
    personality: 'Cheerful and musical',
    description: 'Tweety is a cheerful canary who loves to sing. Brings joy to any home.',
    status: 'Available',
    image_url: 'https://myrightbird.com/assets/uploads/mybird_canary_close_up-900x675.jpg',
    is_active: 1
  },
  {
    id: 10,
    pet_name: 'Bella',
    species: 'Dog',
    breed: 'Poodle',
    age: 2.5,
    size: 'Medium',
    personality: 'Intelligent and friendly',
    description: 'Bella is a smart Poodle who loves learning tricks. Great for families who want an intelligent companion.',
    status: 'Available',
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_2rCAjXgIjsbBFRMRQ1-1sTuvRRIyn16IkQ&s',
    is_active: 1
  },
  {
    id: 11,
    pet_name: 'Shadow',
    species: 'Cat',
    breed: 'British Shorthair',
    age: 3,
    size: 'Medium',
    personality: 'Independent and calm',
    description: 'Shadow is an independent British Shorthair who enjoys his own space but also loves cuddles.',
    status: 'Available',
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYxnr1rTp8Sbb3oIANyiyTzflok9MpSCXb1A&s',
    is_active: 1
  },
  {
    id: 12,
    pet_name: 'Duke',
    species: 'Dog',
    breed: 'German Shepherd',
    age: 4,
    size: 'Large',
    personality: 'Loyal and protective',
    description: 'Duke is a loyal German Shepherd who would make an excellent guard dog and family companion.',
    status: 'Available',
    image_url: 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg',
    is_active: 1
  }
];

export const adoptions = {
  /**
   * Get all adoptions with filters and pagination (DEMO MODE - returns sample data)
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...sampleAdoptions];
    
    // Filter by active status
    if (params.is_active !== undefined) {
      filtered = filtered.filter(a => a.is_active === params.is_active);
    }
    
    // Filter by status
    if (params.status) {
      filtered = filtered.filter(a => a.status === params.status);
    }
    
    // Filter by species
    if (params.species && params.species !== 'All Pets') {
      filtered = filtered.filter(a => a.species === params.species);
    }
    
    // Filter by search query
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filtered = filtered.filter(a => 
        a.pet_name.toLowerCase().includes(searchLower) ||
        a.breed.toLowerCase().includes(searchLower) ||
        (a.personality && a.personality.toLowerCase().includes(searchLower)) ||
        (a.description && a.description.toLowerCase().includes(searchLower))
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
   * Get single adoption by ID
   * @param {number} id - Adoption ID
   */
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const adoption = sampleAdoptions.find(a => a.id === parseInt(id));
    return adoption || null;
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