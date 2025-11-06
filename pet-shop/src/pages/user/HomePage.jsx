import React from 'react';
import {useState} from 'react';
import Navbar from '../../components/user/Navbar.jsx';

import ShopPage from './ShopPage';
import AdoptPage from './AdoptPage';
import DonatePage from './DonatePage';
import CartPage from './CartPage';

const HomePage = () => {
  const [activeMenu, setActiveMenu] = useState('Home');
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} />

      {activeMenu === 'Home' && (
      <div>
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Left Section: Pet of the Week */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-900 min-h-[400px] flex flex-col justify-between p-8">
              {/* Background blur effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-90"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 text-gray-800 w-fit mb-6">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-xs font-medium">Pet of the Week</span>
                </div>

                {/* Pet Name */}
                <h2 className="text-4xl font-bold text-teal-400 mb-4">Bella — Golden Retriever</h2>
                
                {/* Description */}
                <p className="text-gray-300 text-base mb-6">Gentle, playful, and great with kids. Loves fetch and belly rubs.</p>

                {/* Button */}
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors w-fit">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  <span className="font-medium">Meet Me</span>
                </button>
              </div>
            </div>

            {/* Right Section: New this week */}
            <div className="bg-white rounded-2xl p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">New this week</h3>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 text-gray-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="text-xs font-medium">Eco picks</span>
                </div>
              </div>

              {/* Product Items */}
              <div className="space-y-4">
                {/* Item 1: Grain-Free Kibble */}
                <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">Grain-Free Kibble</h4>
                    <p className="text-sm text-gray-500 mb-3">Salmon & sweet potato • 2kg</p>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>

                {/* Item 2: Teaser Wand */}
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">Teaser Wand</h4>
                    <p className="text-sm text-gray-500 mb-3">Feather play • Cats</p>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shop Section */}
          <section className="mt-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-1">Quick Shop</h3>
                <p className="text-sm text-gray-500">Fresh picks for food, toys, and accessories.</p>
              </div>
            </div>

            {/* Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto">
              {/* Premium Dog Food */}
              <div className="bg-white rounded-xl p-4 flex flex-col min-w-[200px]">
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Premium Dog Food</h4>
                  <span className="font-bold text-gray-800 text-sm">$28.00</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Rich in protein • 1.5kg</p>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors text-sm font-medium mt-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Plush Bone Toy */}
              <div className="bg-white rounded-xl p-4 flex flex-col min-w-[200px]">
                <div className="w-full h-32 bg-yellow-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Plush Bone Toy</h4>
                  <span className="font-bold text-gray-800 text-sm">$12.00</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Squeaky • Small/Medium</p>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors text-sm font-medium mt-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Scratching Post */}
              <div className="bg-white rounded-xl p-4 flex flex-col min-w-[200px]">
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Scratching Post</h4>
                  <span className="font-bold text-gray-800 text-sm">$35.00</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Natural sisal • Stable base</p>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors text-sm font-medium mt-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Water Fountain */}
              <div className="bg-white rounded-xl p-4 flex flex-col min-w-[200px]">
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Water Fountain</h4>
                  <span className="font-bold text-gray-800 text-sm">$49.00</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Quiet pump • 2L</p>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors text-sm font-medium mt-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Nylon L */}
              <div className="bg-white rounded-xl p-4 flex flex-col min-w-[200px]">
                <div className="w-full h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Nylon L</h4>
                  <span className="font-bold text-gray-800 text-sm">$24.00</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Soft grip</p>
                <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors text-sm font-medium mt-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </section>
        </main>
        {/* Help a Pet Today Banner */}
        <section className="bg-orange-50 border-t border-orange-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Help a Pet Today</h3>
                  <p className="text-sm text-gray-600">Your donation funds food, medical care, and safe shelter for animals in need.</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-400 text-white hover:bg-teal-500 transition-colors font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Donate</span>
              </button>
            </div>
          </div>
        </section>
      </div>
      )}

      {activeMenu === 'Shop' && (
        <div>
          <ShopPage />
        </div>
      )}

      {activeMenu === 'Adopt' && (
        <div>
          <AdoptPage />
        </div>
      )}

      {activeMenu === 'Donate' && (
        <div>
          <DonatePage />
        </div>
      )}

      {activeMenu === 'Cart' && (
        <div>
          <CartPage />  
        </div>
      )}
     
    </div>
  );
};

export default HomePage;
   
