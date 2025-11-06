import React, { useState } from 'react';
import { PawPrint, X } from 'lucide-react';

const AdoptionApplicationModal = ({ isOpen, onClose, selectedPet = null }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    
    // Pet Information
    petInterest: selectedPet?.name || '',
    petId: selectedPet?.id || '',
    petPreferences: '',
    
    // Living Situation
    homeType: '',
    hasYard: '',
    yardFenced: '',
    rentOrOwn: '',
    landlordApproval: '',
    otherPets: '',
    otherPetsDetails: '',
    children: '',
    childrenAges: '',
    
    // Experience
    petExperience: '',
    currentPets: '',
    previousPets: '',
    veterinarian: '',
    veterinarianPhone: '',
    
    // References
    reference1Name: '',
    reference1Phone: '',
    reference1Relation: '',
    reference2Name: '',
    reference2Phone: '',
    reference2Relation: '',
    
    // Additional Information
    whyAdopt: '',
    dailySchedule: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Agreement
    agreeTerms: false,
    agreeHomeVisit: false
  });

  const totalSteps = 5;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Adoption application submitted:', formData);
    // Show success message and close modal
    alert('Thank you! Your adoption application has been submitted. We will contact you soon.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
        style={{ backgroundColor: '#FEFBF6' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b" style={{ backgroundColor: '#FEFBF6', borderColor: '#E5E5E5' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#14B8A6' }}>
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Adoption Application</h2>
              {selectedPet && (
                <p className="text-sm" style={{ color: '#6B7280' }}>
                  Applying for: <span className="font-semibold" style={{ color: '#14B8A6' }}>{selectedPet.name}</span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: '#6B7280' }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b" style={{ borderColor: '#E5E5E5', backgroundColor: '#FEFBF6' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: '#6B7280' }}>
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium" style={{ color: '#6B7280' }}>
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full h-2 rounded-full" style={{ backgroundColor: '#E5E5E5' }}>
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                backgroundColor: '#14B8A6'
              }}
            />
          </div>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Pet Interest & Living Situation */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Pet Interest</h3>
                
                {!selectedPet && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Which pet are you interested in? *
                    </label>
                    <input
                      type="text"
                      name="petInterest"
                      value={formData.petInterest}
                      onChange={handleChange}
                      required
                      placeholder="Enter pet name or leave blank for general application"
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Pet Preferences
                  </label>
                  <textarea
                    name="petPreferences"
                    value={formData.petPreferences}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about your ideal pet (size, energy level, personality, etc.)"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 resize-none"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Pet Experience</h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Do you have experience with pets? *
                  </label>
                  <select
                    name="petExperience"
                    value={formData.petExperience}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  >
                    <option value="">Select</option>
                    <option value="Extensive">Extensive (10+ years)</option>
                    <option value="Moderate">Moderate (3-10 years)</option>
                    <option value="Some">Some (1-3 years)</option>
                    <option value="None">None</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Current Pets
                  </label>
                  <input
                    type="text"
                    name="currentPets"
                    value={formData.currentPets}
                    onChange={handleChange}
                    placeholder="List any current pets you have"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Previous Pets
                  </label>
                  <textarea
                    name="previousPets"
                    value={formData.previousPets}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us about pets you've had in the past"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 resize-none"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Veterinarian Name
                    </label>
                    <input
                      type="text"
                      name="veterinarian"
                      value={formData.veterinarian}
                      onChange={handleChange}
                      placeholder="Veterinarian or clinic name"
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Veterinarian Phone
                    </label>
                    <input
                      type="tel"
                      name="veterinarianPhone"
                      value={formData.veterinarianPhone}
                      onChange={handleChange}
                      placeholder="Phone number"
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: References & Additional Info */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Additional Information</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Why do you want to adopt a pet? *
                  </label>
                  <textarea
                    name="whyAdopt"
                    value={formData.whyAdopt}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell us about your motivation for adopting..."
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 resize-none"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    Daily Schedule
                  </label>
                  <textarea
                    name="dailySchedule"
                    value={formData.dailySchedule}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Describe your typical daily routine and how you'll care for the pet"
                    className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200 resize-none"
                    style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-teal-200"
                      style={{ backgroundColor: '#FEFBF6', borderColor: '#D1D5DB', color: '#1F2937' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Agreement */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#1F2937' }}>Agreement & Terms</h3>
                
                <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: '#F0FDFA', border: '1px solid #14B8A6' }}>
                  <h4 className="font-semibold mb-3" style={{ color: '#1F2937' }}>Adoption Agreement</h4>
                  <div className="text-sm space-y-2" style={{ color: '#374151' }}>
                    <p>By submitting this application, I understand that:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>All information provided is true and accurate</li>
                      <li>The adoption process may include a home visit</li>
                      <li>Adoption fees apply and are non-refundable</li>
                      <li>I am responsible for the pet's care and well-being</li>
                      <li>The organization reserves the right to deny any application</li>
                      <li>I will provide proper veterinary care and a safe home</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5"
                      style={{ accentColor: '#14B8A6' }}
                    />
                    <span className="text-sm" style={{ color: '#374151' }}>
                      I agree to the terms and conditions of the adoption process *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeHomeVisit"
                      checked={formData.agreeHomeVisit}
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5"
                      style={{ accentColor: '#14B8A6' }}
                    />
                    <span className="text-sm" style={{ color: '#374151' }}>
                      I agree to allow a home visit if requested *
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="flex items-center justify-between pt-6 mt-6 border-t" style={{ borderColor: '#E5E5E5' }}>
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2.5 rounded-lg border text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              style={{ borderColor: '#D1D5DB', color: '#374151' }}
            >
              Previous
            </button>
            
            <div className="flex items-center gap-3">
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#14B8A6' }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.agreeTerms || !formData.agreeHomeVisit}
                  className="px-6 py-2.5 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ backgroundColor: '#14B8A6' }}
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionApplicationModal;