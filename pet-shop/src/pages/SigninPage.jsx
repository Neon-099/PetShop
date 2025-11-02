import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log('Sign in:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Elegant Header - Same as Landing Page */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <svg className="w-10 h-10 text-orange-500 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Paw Market
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="#shop" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium text-sm relative group">
                Shop
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="#adopt" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium text-sm relative group">
                Adopt
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="#about" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium text-sm relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="#contact" className="text-gray-700 hover:text-orange-500 transition-colors duration-200 font-medium text-sm relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium text-sm border border-transparent hover:border-gray-200"
              >
                <span>Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Promotional Section */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full flex flex-col">
              {/* Image Section */}
              <div className="relative flex-1 min-h-[400px] bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-50">
                {/* Placeholder for living room image with cats */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-32 h-32 mx-auto mb-4 text-yellow-300 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="text-gray-400 text-sm">Living room with cats</p>
                  </div>
                </div>
                
                {/* Welcome Back Callout */}
                <div className="absolute bottom-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50/90 backdrop-blur-sm border border-amber-100 shadow-sm">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-800">Welcome back to Paw Market</span>
                  </div>
                </div>
              </div>

              {/* Feature List */}
              <div className="p-6 space-y-0">
                <div className="flex items-center gap-4 py-4 border-b border-gray-100">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Fast, tracked delivery on all orders</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4 border-b border-gray-100">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Secure checkout & protected data</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Support shelters with every purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sign In Form */}
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign in</h1>
              <p className="text-gray-600 text-sm mb-8">
                Access your orders, favorites, and adoption applications.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Continue</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </form>

              {/* Separator */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Alternative Sign-in Options */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-gray-800 transition-all duration-200 border border-amber-100 font-medium text-sm"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Magic link</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-gray-800 transition-all duration-200 border border-amber-100 font-medium text-sm"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </button>
              </div>

              {/* New User Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">New here?</p>
                <Link to='/signup'
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg"
                >
                  Create account
                </Link>  
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;