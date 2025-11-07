import React, { useState, useEffect, useCallback } from 'react';
import AdminSidebar  from '../../components/admin/AdminSidebar.jsx';
import ManageProductPage from './ManageProductPage.jsx';
import ManageAdoptionsPage from './ManageAdoptionsPage.jsx';
import ManageCustomersPage from './ManageCustomersPage.jsx';
import AdminFooter from '../../components/admin/AdminFooter.jsx';

import AddProductModal from '../../components/admin/AddProductModal.jsx';
import AddAdoptionModal from '../../components/admin/AddAdoptionModal.jsx';
import { products } from '../../utils/products';
import { adoptions } from '../../utils/adoptions';

const RenderTopProducts = ({product, handleEditProduct, handleDeleteProduct}) => {
    return (
      <div key={product.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-indigo-200 hover:shadow-sm transition-all">
        <img
          src={product.image_url || 'https://via.placeholder.com/80?text=Product'}
          alt={product.name || 'Product'}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-medium text-gray-800">{product.name}</h4>
          <p className="text-xs text-gray-500">{product.sku}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded">{product.category}</span>
            <span className="text-sm font-semibold text-gray-800">{product.price}</span>
          </div>
        </div>
        <div  
          onClick={() => handleEditProduct(product)}
          className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button 
            onClick={() => handleDeleteProduct(product.id)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" style={{ color: '#DC2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    )
}

const RenderNewestPets = ({pet, handleEditAdoption, handleDeleteAdoption}) => {
  return (
    <div key={pet.id} className="bg-white border border-gray-100 rounded-lg p-4 hover:border-indigo-200 hover:shadow-sm transition-all">
      <img
        src={pet.image_url || 'https://via.placeholder.com/80?text=Pet'}
        alt={pet.name}
        className="w-full h-32 object-cover rounded-lg mb-3"
      />
      <h4 className="font-medium text-gray-800 mb-1">{pet.name}</h4>
      <div className="text-xs text-gray-600 space-y-0.5 mb-3">
        <p>{pet.age} • {pet.breed}</p>
        <p>{pet.personality}</p>
      </div>
      <div className="flex items-center gap-2">
        <button  
        onClick={() => handleEditAdoption(pet)}
        className="w-full py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm transition-colors flex items-center justify-center gap-2">
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button  
        onClick={() => handleDeleteAdoption(pet.id)}
        className="w-full py-2 px-3 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-sm transition-colors flex items-center justify-center gap-2">
        <svg className="w-4 h-4" style={{ color: '#DC2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
      </div>
    </div>
  );
}

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [allAdoptions, setAllAdoptions] = useState([]); // Store all adoptions
  const [productList, setProductList] = useState([]); // Displayed products
  const [adoptionList, setAdoptionList] = useState([]); // Displayed adoptions
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial fetch

  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditAdoptionModal, setShowEditAdoptionModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  }
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await products.delete(productId);
      await fetchProducts(); // Refresh all products
    }
    catch (err){
      console.error('Error deleting product: ', err);
    }
  }
  const handleEditAdoption = (pet) => {
    setSelectedPet(pet);
    setShowEditAdoptionModal(true);
  }
  const handleDeleteAdoption = async (adoptionId) => {
    if(!window.confirm('Are you sure you want to delete this adoption?')) {
      return;
    }
    try {
      await adoptions.delete(adoptionId);
      await fetchAdoptions(); // Refresh all adoptions
    } 
    catch (err){
      console.error('Error deleting adoption: ', err);
    }
  }


  const productInStock = () => {
    return allProducts.reduce((sum, product) => sum.length + (product.quantity || 0), 0);
  }

  const petAvailable = () => {
    return allAdoptions.filter(adoption => adoption.status === 'Available').length;
  }
  const adoptionThisWeek = () => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);
    return allAdoptions.filter(adoption => {
      const adoptionDate = new Date(adoption.created_at);
      return adoptionDate >= startOfWeek && adoptionDate <= endOfWeek;
    }).length;
  }
  const totalOrders = () => {
    
  }
  // Sample data - replace with actual API calls
  const summaryCards = [
    { title: 'Orders', value: '128', icon: 'box', color: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { title: 'Products in Stock', value: productInStock(), icon: 'bone', color: 'bg-purple-50', iconColor: 'text-purple-600' },
    { title: 'Pets Available', value: petAvailable(), icon: 'paw', color: 'bg-blue-50', iconColor: 'text-blue-600' },
    { title: 'Adoptions This Week', value: adoptionThisWeek(), icon: 'heart', color: 'bg-indigo-50', iconColor: 'text-indigo-600' }
  ];

  const renderIcon = (iconName, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'home':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'wrench':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'clock':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'users':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'gear':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'document':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'box':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'bone':
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        );
      case 'paw':
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        );
      case 'heart':
        return (
          <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  

  // Fetch all products and adoptions (no search parameter)
  const fetchProducts = useCallback(async () => {
    try {
      const params = {
        page: 1,
        per_page: 100 // Fetch more items for client-side search
      };
      
      const response = await products.getAll(params);
      console.log("Products response: ", response);
      setAllProducts(response.items || []);
      return response.items || [];
    } catch (err) {
      console.error('Error fetching products: ', err);
      setAllProducts([]);
      return [];
    }
  }, []);

  const fetchAdoptions = useCallback(async () => {
    try {
      const params = {
        page: 1,
        per_page: 100 // Fetch more items for client-side search
      };
      
      const response = await adoptions.getAll(params);
      console.log("Adoptions response: ", response);
      setAllAdoptions(response.items || []);
      return response.items || [];
    } catch (err) {
      console.error('Error fetching adoptions: ', err);
      setAllAdoptions([]);
      return [];
    }
  }, []);

  // Client-side search filter function
  const filterItems = useCallback((query) => {
    const searchTerm = query.trim().toLowerCase();
    
    if (!searchTerm) {
      // No search query - show first 5 products and 5 adoptions
      setProductList(allProducts.slice(0, 5));
      setAdoptionList(allAdoptions.slice(0, 5));
      return;
    }

    // Filter products - search in name, sku, description, category
    const filteredProducts = allProducts.filter(product => {
      const name = (product.name || '').toLowerCase();
      const sku = (product.sku || '').toLowerCase();
      const description = (product.description || '').toLowerCase();
      const category = (product.category || '').toLowerCase();
      
      return name.includes(searchTerm) || 
             sku.includes(searchTerm) || 
             description.includes(searchTerm) ||
             category.includes(searchTerm);
    });

    // Filter adoptions - search in name, breed, description
    const filteredAdoptions = allAdoptions.filter(adoption => {
      const name = (adoption.name || '').toLowerCase();
      const breed = (adoption.breed || '').toLowerCase();
      const description = (adoption.description || '').toLowerCase();
      const species = (adoption.species || '').toLowerCase();
      
      return name.includes(searchTerm) || 
             breed.includes(searchTerm) || 
             description.includes(searchTerm) ||
             species.includes(searchTerm);
    });

    setProductList(filteredProducts);
    setAdoptionList(filteredAdoptions);
  }, [allProducts, allAdoptions]);

  // Initial load - fetch all data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          fetchProducts(),
          fetchAdoptions()
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [activeMenu, showEditProductModal, showEditAdoptionModal, fetchProducts, fetchAdoptions]);

  // Apply search filter whenever search query or data changes
  useEffect(() => {
    filterItems(searchQuery);
  }, [searchQuery, allProducts, allAdoptions, filterItems]);

  const hasSearchResults = searchQuery.trim() && (productList.length > 0 || adoptionList.length > 0);
  const hasNoResults = searchQuery.trim() && productList.length === 0 && adoptionList.length === 0 && !isLoading;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <AdminSidebar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {activeMenu === 'Dashboard' && (
          <main className="flex-1 p-8 bg-gray-50 overflow-y-auto">
            <header className="bg-white border-b border-gray-200 px-8 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Pet eCommerce & Adoption</h1>
                  <p className="text-gray-600 mt-1">Monitor sales, inventory, and pets awaiting a loving home</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products or pets..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-80 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button className="px-4 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>
                  <button className="px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center justify-center text-xl font-semibold">
                    Add Product
                  </button>
                </div>
              </div>
            </header>

            {/* Summary Cards - Always show */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Today at a glance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {summaryCards.map((card, index) => (
                  <div key={index} className={`${card.color} rounded-xl p-6 shadow-sm`}>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`${card.iconColor} p-2 rounded-lg bg-white`}>
                        {renderIcon(card.icon, 'w-6 h-6')}
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mb-1">{card.value}</p>
                    <p className="text-sm text-gray-600">{card.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-gray-500">Loading data...</div>
              </div>
            )}

            {/* Search Results Section - Show when searching */}
            {!isLoading && searchQuery.trim() && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Search Results for "{searchQuery}"
                  </h2>
                  <span className="text-sm text-gray-500">
                    {productList.length + adoptionList.length} results found
                  </span>
                </div>

                {hasNoResults ? (
                  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-lg font-medium text-gray-700 mb-2">No results found</p>
                    <p className="text-sm text-gray-500">Try searching with different keywords</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Products Results */}
                    {productList.length > 0 && (
                      <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                          {renderIcon('wrench', 'w-5 h-5 text-indigo-600')}
                          <h3 className="text-lg font-semibold text-gray-800">Products ({productList.length})</h3>
                        </div>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {productList.map((product) => (
                            <RenderTopProducts 
                              key={product.id}
                              product={product} 
                              handleEditProduct={() => handleEditProduct(product)}
                              handleDeleteProduct={() => handleDeleteProduct(product.id)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Adoptions Results */}
                    {adoptionList.length > 0 && (
                      <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-2 mb-6">
                          {renderIcon('paw', 'w-5 h-5 text-indigo-600')}
                          <h3 className="text-lg font-semibold text-gray-800">Pets ({adoptionList.length})</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                          {adoptionList.map((pet) => (
                            <RenderNewestPets 
                              key={pet.id}
                              pet={pet}
                              handleEditAdoption={() => handleEditAdoption(pet)}
                              handleDeleteAdoption={() => handleDeleteAdoption(pet.id)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Top Products and Newest Pets - Show when NOT searching */}
            {!isLoading && !searchQuery.trim() && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-6">
                    {renderIcon('wrench', 'w-5 h-5 text-indigo-600')}
                    <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
                  </div>
                  <div className="space-y-4">
                    {productList.map((product) => (
                      <RenderTopProducts 
                        key={product.id}
                        product={product} 
                        handleEditProduct={() => handleEditProduct(product)}
                        handleDeleteProduct={() => handleDeleteProduct(product.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Newest Pets for Adoption Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center gap-2 mb-6">
                    {renderIcon('paw', 'w-5 h-5 text-indigo-600')}
                    <h3 className="text-lg font-semibold text-gray-800">Newest Pets for Adoption</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {adoptionList.map((pet) => (
                      <RenderNewestPets 
                        key={pet.id}
                        pet={pet}
                        handleEditAdoption={() => handleEditAdoption(pet)}
                        handleDeleteAdoption={() => handleDeleteAdoption(pet.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tip Section - Only show when not searching */}
            {!isLoading && !searchQuery.trim() && (
              <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-indigo-700">Tip:</span> Use Filters to narrow down product lines or specific pets ready for adoption.
                </p>
              </div>
            )}
          </main>
        )}

        {activeMenu === 'Products' && (
          <ManageProductPage 
            />
        )}

        {activeMenu === 'Adoptions' && (
          <ManageAdoptionsPage 
             />
        )}

        {activeMenu === 'Customers' && (
          <ManageCustomersPage 
            />
        )}
        <AdminFooter />
        {showEditProductModal && (
          <AddProductModal 
            onClose={() => setShowEditProductModal(false)}
            product={selectedProduct}
        title="Edit Adoption Details"
        />
        )}
        {showEditAdoptionModal && (
          <AddAdoptionModal 
            onClose={() => setShowEditAdoptionModal(false)}
            adoption={selectedPet}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;