import React, { useState } from 'react';
import { PawPrint } from 'lucide-react';

const DonatePage = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donationType, setDonationType] = useState('one-time');
  const [selectedCause, setSelectedCause] = useState('general');

  const presetAmounts = [25, 50, 100, 250, 500];
  const causes = [
    { id: 'general', name: 'General Fund', desc: 'Support our overall mission' },
    { id: 'medical', name: 'Medical Care', desc: 'Help pets get veterinary care' },
    { id: 'food', name: 'Food & Supplies', desc: 'Provide food and essentials' },
    { id: 'shelter', name: 'Shelter Support', desc: 'Maintain safe housing' },
    { id: 'emergency', name: 'Emergency Fund', desc: 'Help pets in crisis' }
  ];

  const impactStats = [
    { amount: '$25', impact: 'Feeds a pet for 2 weeks' },
    { amount: '$50', impact: 'Covers basic medical checkup' },
    { amount: '$100', impact: 'Provides shelter for 1 month' },
    { amount: '$250', impact: 'Funds emergency surgery' },
    { amount: '$500', impact: 'Saves multiple pets' }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FEFBF6' }}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-3" style={{ color: '#1F2937' }}>Help a Pet Today</h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
            Your donation funds food, medical care, and safe shelter for animals in need. 
            Every contribution makes a difference in a pet's life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Donation Form */}
          <div className="lg:col-span-2">
            {/* Donation Amount Section */}
            <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Donation Amount</h2>
              
              {/* Preset Amounts */}
              <div className="grid grid-cols-5 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount.toString())}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                      donationAmount === amount.toString()
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{
                      backgroundColor: donationAmount === amount.toString() ? '#14B8A6' : '#FEFBF6',
                      border: '1px solid #D1D5DB'
                    }}
                  >
                    ${amount}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                  style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                />
              </div>

              {/* Donation Type */}
              <div className="flex items-center gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="donationType"
                    value="one-time"
                    checked={donationType === 'one-time'}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#14B8A6' }}
                  />
                  <span className="text-sm" style={{ color: '#374151' }}>One-time</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="donationType"
                    value="monthly"
                    checked={donationType === 'monthly'}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="w-4 h-4"
                    style={{ accentColor: '#14B8A6' }}
                  />
                  <span className="text-sm" style={{ color: '#374151' }}>Monthly</span>
                </label>
              </div>
            </div>

            {/* Cause Selection */}
            <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Choose a Cause</h2>
              <div className="space-y-3">
                {causes.map((cause) => (
                  <button
                    key={cause.id}
                    onClick={() => setSelectedCause(cause.id)}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedCause === cause.id
                        ? 'border-2'
                        : 'border'
                    }`}
                    style={{
                      backgroundColor: selectedCause === cause.id ? '#F0FDFA' : '#FEFBF6',
                      borderColor: selectedCause === cause.id ? '#14B8A6' : '#E5E5E5'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1" style={{ color: '#1F2937' }}>{cause.name}</h3>
                        <p className="text-sm" style={{ color: '#6B7280' }}>{cause.desc}</p>
                      </div>
                      {selectedCause === cause.id && (
                        <svg className="w-5 h-5" style={{ color: '#14B8A6' }} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Information */}
            <div className="rounded-xl p-6 mb-6" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
              <h2 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Your Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    placeholder="john@example.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Card Number</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>CVV</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              className="w-full px-6 py-4 rounded-lg text-white hover:opacity-90 transition-colors font-semibold text-lg"
              style={{ backgroundColor: '#14B8A6' }}
            >
              {donationType === 'monthly' ? 'Start Monthly Donation' : 'Donate Now'}
            </button>

            <p className="text-xs text-center mt-4" style={{ color: '#6B7280' }}>
              Your donation is secure and tax-deductible. We'll send you a receipt via email.
            </p>
          </div>

          {/* Right Column - Impact & Info */}
          <div className="space-y-6">
            {/* Impact Stats */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Your Impact</h3>
              <div className="space-y-3">
                {impactStats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: '#F0FDFA' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#14B8A6' }}>
                      <PawPrint className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: '#1F2937' }}>{stat.amount}</p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>{stat.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Donate */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Why Donate?</h3>
              <ul className="space-y-3">
                {[
                  '100% of donations go directly to pet care',
                  'Tax-deductible contributions',
                  'Transparent financial reporting',
                  'Help pets find forever homes',
                  'Support medical care and rehabilitation'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#14B8A6' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span className="text-sm" style={{ color: '#374151' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Donations */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#FEFBF6', border: '1px solid #E5E5E5' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Recent Donations</h3>
              <div className="space-y-3">
                {[
                  { name: 'Sarah M.', amount: '$100', time: '2 hours ago' },
                  { name: 'Michael T.', amount: '$50', time: '5 hours ago' },
                  { name: 'Anonymous', amount: '$250', time: '1 day ago' },
                  { name: 'Emma L.', amount: '$25', time: '2 days ago' }
                ].map((donation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#F0FDFA' }}>
                    <div>
                      <p className="font-medium text-sm" style={{ color: '#1F2937' }}>{donation.name}</p>
                      <p className="text-xs" style={{ color: '#6B7280' }}>{donation.time}</p>
                    </div>
                    <p className="font-semibold" style={{ color: '#14B8A6' }}>{donation.amount}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;