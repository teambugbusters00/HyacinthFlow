import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MapPin, Phone, Mail, Camera, CheckCircle } from 'lucide-react';

export const FarmerRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      phone: '',
      email: '',
      age: '',
      gender: ''
    },
    locationInfo: {
      state: '',
      district: '',
      village: '',
      pincode: '',
      nearestWaterBody: ''
    },
    farmingInfo: {
      experience: '',
      landSize: '',
      currentCrops: '',
      hyacinthAccess: ''
    }
  });

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    // Simulate registration process
    setTimeout(() => {
      navigate('/farmer-dashboard');
    }, 2000);
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Farming Details', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-4xl mx-auto py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join Our <span className="text-emerald-600">Farmer Network</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Register to start earning from water hyacinth collection and access exclusive rewards.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-white text-gray-600 border border-gray-300'
                }`}>
                  <step.icon className="h-5 w-5" />
                  <span className="font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-1 rounded-full transition-colors duration-300 ${
                    currentStep > step.number ? 'bg-emerald-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.personalInfo.fullName}
                    onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.personalInfo.phone}
                    onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={formData.personalInfo.age}
                    onChange={(e) => handleInputChange('personalInfo', 'age', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={formData.personalInfo.gender}
                  onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Location Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Location Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={formData.locationInfo.state}
                    onChange={(e) => handleInputChange('locationInfo', 'state', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  >
                    <option value="">Select State</option>
                    <option value="kerala">Kerala</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="andhra-pradesh">Andhra Pradesh</option>
                    <option value="west-bengal">West Bengal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                  <input
                    type="text"
                    value={formData.locationInfo.district}
                    onChange={(e) => handleInputChange('locationInfo', 'district', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="Enter your district"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Village/Town</label>
                  <input
                    type="text"
                    value={formData.locationInfo.village}
                    onChange={(e) => handleInputChange('locationInfo', 'village', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="Enter your village or town"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">PIN Code</label>
                  <input
                    type="text"
                    value={formData.locationInfo.pincode}
                    onChange={(e) => handleInputChange('locationInfo', 'pincode', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="123456"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nearest Water Body</label>
                <input
                  type="text"
                  value={formData.locationInfo.nearestWaterBody}
                  onChange={(e) => handleInputChange('locationInfo', 'nearestWaterBody', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  placeholder="Lake, river, or pond name"
                />
              </div>
            </div>
          )}

          {/* Step 3: Farming Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Farming Experience</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Farming Experience</label>
                  <select
                    value={formData.farmingInfo.experience}
                    onChange={(e) => handleInputChange('farmingInfo', 'experience', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  >
                    <option value="">Select Experience</option>
                    <option value="beginner">Beginner (0-2 years)</option>
                    <option value="intermediate">Intermediate (3-10 years)</option>
                    <option value="experienced">Experienced (10+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Land Size (acres)</label>
                  <input
                    type="number"
                    value={formData.farmingInfo.landSize}
                    onChange={(e) => handleInputChange('farmingInfo', 'landSize', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Crops</label>
                <input
                  type="text"
                  value={formData.farmingInfo.currentCrops}
                  onChange={(e) => handleInputChange('farmingInfo', 'currentCrops', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  placeholder="Rice, wheat, vegetables..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Hyacinth Access</label>
                <select
                  value={formData.farmingInfo.hyacinthAccess}
                  onChange={(e) => handleInputChange('farmingInfo', 'hyacinthAccess', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                >
                  <option value="">Select Access Level</option>
                  <option value="abundant">Abundant (can collect 500+ kg/month)</option>
                  <option value="moderate">Moderate (can collect 200-500 kg/month)</option>
                  <option value="limited">Limited (can collect 100-200 kg/month)</option>
                </select>
              </div>

              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                <h3 className="font-semibold text-emerald-800 mb-2">Expected Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-emerald-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Earn ₹15 per kg collected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Free farming tools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Biogas kit access</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Community support</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : navigate('/get-started')}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              {currentStep === 1 ? '← Back to Get Started' : '← Previous'}
            </button>
            
            {currentStep < 3 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-200"
              >
                Next Step →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Complete Registration</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};