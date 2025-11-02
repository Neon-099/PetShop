import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    preferredRole: 'Shopper & Adopter',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up:', { ...formData, agreeToTerms });
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
              <div className="relative flex-1 min-h-[400px] bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50">
                {/* Placeholder for couple with pets image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-32 h-32 mx-auto mb-4 text-amber-300 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p className="text-gray-400 text-sm">Couple with pets</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="px-6 pt-6">
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-50 hover:bg-amber-100 text-gray-800 transition-all duration-200 border border-amber-200 font-medium text-sm shadow-sm">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span>Create your Paw Market account</span>
                </button>
              </div>

              {/* Benefits List */}
              <div className="p-6 space-y-0">
                <div className="flex items-center gap-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Earn rewards on every purchase</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Faster adoption applications</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm">Back-in-stock and adoption alerts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Create Account Form */}
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
              {/* Security Indicator */}
              <div className="absolute top-8 right-8 flex items-center gap-1.5 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-800 mb-2 pr-16">Create account</h1>
              <p className="text-gray-600 text-sm mb-8">
                Start shopping and apply for adoptions with one account.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className='flex flex-row gap-5'>
                  {/* First Name Field */}
                  <div>
                    <label htmlFor="firstName" className="text-start block text-sm font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex  items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                  {/* Last Name Field */}
                  <div>
                    <label htmlFor="lastName" className="text-start block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <div className="relative">
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="text-start block text-sm font-medium text-gray-700 mb-2">
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
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="text-start block text-sm font-medium text-gray-700 mb-2">
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
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Phone Field (Optional) */}
                <div>
                  <label htmlFor="phone" className="text-start block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 555 000 1234"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Terms & Privacy */}
                <div className="flex items-start gap-2">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    required
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Terms & Privacy
                    </a>
                    {' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      View policies
                    </a>
                  </label>
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-b from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Create account</span>
                </button>
              </form>

              {/* Separator */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              {/* Alternative Sign-up Options */}
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

              {/* Sign In Link */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">Already have an account?</p>
                <Link
                  to="/signin"
                  className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>Sign in</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;