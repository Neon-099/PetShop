import React from 'react';
import {Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Elegant Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <svg className="w-10 h-10 text-orange-500 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Paw Market
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#shop" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium text-sm relative group">
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#adopt" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium text-sm relative group">
                Adopt
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#about" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium text-sm relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium text-sm relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-sm border border-transparent hover:border-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
              </button>
              <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-sm border border-transparent hover:border-gray-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Cart</span>
              </button>
              <Link to='/signin' className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Section */}
          <div className="space-y-8">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-gray-800 border border-orange-100">
              <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <span className="text-sm font-medium">Everything pets. One place.</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Find your new best friend and everything they need
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed">
              Shop trusted essentials and discover pets ready for adoption. Curated gear, healthy food, and playful accessories—delivered with love.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-400 text-white hover:bg-blue-500 transition font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Shop Now
              </button>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-orange-200 text-gray-800 hover:bg-orange-300 transition font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                Adopt a Pet
              </button>
            </div>

            {/* Feature Highlights */}
            <div className="flex flex-wrap gap-3 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-800 shadow-sm">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-sm font-medium">Fast delivery</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-800 shadow-sm">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Vet-approved</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-800 shadow-sm">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-sm font-medium">Eco-friendly</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Top Left Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
              <div className="w-full h-full bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <p className="text-sm opacity-75">Dog with bandana</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-gray-800 shadow-md">
                  <svg className="w-3.5 h-3.5 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-xs font-medium">Pals waiting for you</span>
                </div>
              </div>
            </div>

            {/* Top Right Image Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-square">
              <div className="w-full h-full bg-gradient-to-br from-orange-200 via-orange-300 to-orange-400 flex items-center justify-center">
                <div className="text-center text-gray-700">
                  <svg className="w-20 h-20 mx-auto mb-4 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <p className="text-sm opacity-75">Pet feeder</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-gray-800 shadow-md">
                  <svg className="w-3.5 h-3.5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <span className="text-xs font-medium">Top-rated gear</span>
                </div>
              </div>
            </div>

            {/* Bottom Image Card - Full Width */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg col-span-2 aspect-[2/1]">
              <div className="w-full h-full bg-gradient-to-br from-green-200 via-green-300 to-green-400 flex items-center justify-center">
                <div className="text-center text-gray-700">
                  <svg className="w-32 h-32 mx-auto mb-4 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <p className="text-sm opacity-75">Kids with dog</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-gray-800 shadow-md">
                  <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  <span className="text-xs font-medium">Make a difference</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Elegant Footer */}
      <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-xl font-bold text-gray-800">Paw Market</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your trusted companion for all pet needs. Quality products, loving adoptions, and exceptional care.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-400 hover:text-white flex items-center justify-center transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all duration-200 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-wider mb-4">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    Food & Treats
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    Toys & Accessories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    Grooming Supplies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    Health & Wellness
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>

            {/* Adopt */}
            <div>
              <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-wider mb-4">Adopt</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    Available Pets
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    Adoption Process
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    How to Help
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm">
                    Volunteer
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-gray-800 font-semibold text-sm uppercase tracking-wider mb-4">Stay Updated</h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Get the latest pet care tips and exclusive offers delivered to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-sm"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Paw Market. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-200 text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-200 text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-200 text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;