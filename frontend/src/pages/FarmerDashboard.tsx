import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Package,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Camera,
  Upload,
  Bell,
  Settings,
  LogOut,
  CheckCircle,
  XCircle,
  Loader
} from 'lucide-react';
import { apiService, ImagePredictionData } from '../api';

export const FarmerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    weight: '',
    collectionDate: '',
    latitude: '',
    longitude: '',
    waterTemperature: '',
    waterPh: '',
    nutrientLevel: '',
    sunlightExposure: '',
    waterFlowRate: '',
    waterBodyType: 'lake',
    season: 'summer'
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const stats = [
    { label: 'Total Collected', value: '1,247 kg', icon: Package, color: 'emerald' },
    { label: 'This Month', value: '247 kg', icon: Calendar, color: 'blue' },
    { label: 'Total Earnings', value: '₹18,705', icon: TrendingUp, color: 'amber' },
    { label: 'Rewards Earned', value: '3', icon: Award, color: 'purple' }
  ];

  const recentSubmissions = [
    { date: '2025-01-15', amount: '150 kg', status: 'Verified', earnings: '₹2,250' },
    { date: '2025-01-12', amount: '120 kg', status: 'Processing', earnings: '₹1,800' },
    { date: '2025-01-08', amount: '180 kg', status: 'Verified', earnings: '₹2,700' },
  ];

  const availableRewards = [
    { name: 'Biogas Kit', progress: 80, required: '1,500 kg', current: '1,200 kg' },
    { name: 'Solar Dryer', progress: 45, required: '2,000 kg', current: '900 kg' },
    { name: 'Advanced Tools', progress: 25, required: '3,000 kg', current: '750 kg' },
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      if (!selectedImage) {
        throw new Error('Please select an image');
      }

      // Validate required fields
      const requiredFields = ['weight', 'collectionDate', 'latitude', 'longitude',
                             'waterTemperature', 'waterPh', 'nutrientLevel',
                             'sunlightExposure', 'waterFlowRate'];
      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          throw new Error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        }
      }

      const predictionData: ImagePredictionData = {
        image: selectedImage,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        water_temperature: parseFloat(formData.waterTemperature),
        water_ph: parseFloat(formData.waterPh),
        nutrient_level: parseFloat(formData.nutrientLevel),
        sunlight_exposure: parseFloat(formData.sunlightExposure),
        water_flow_rate: parseFloat(formData.waterFlowRate),
        water_body_type: formData.waterBodyType,
        season: formData.season
      };

      const result = await apiService.createImagePrediction(predictionData);

      setSubmitStatus('success');
      setSubmitMessage(`Collection submitted successfully! Prediction ID: ${result.id}`);

      // Reset form
      setFormData({
        weight: '',
        collectionDate: '',
        latitude: '',
        longitude: '',
        waterTemperature: '',
        waterPh: '',
        nutrientLevel: '',
        sunlightExposure: '',
        waterFlowRate: '',
        waterBodyType: 'lake',
        season: 'summer'
      });
      setSelectedImage(null);
      setImagePreview(null);

    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto py-8">
        {/* Welcome Header */}
        <div className="bg-white p-8 rounded-3xl shadow-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, <span className="text-emerald-600">Raj Kumar</span>! 🌱
              </h1>
              <p className="text-gray-600">Your contribution is making a real difference in our community.</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <button 
                onClick={() => navigate('/')}
                className="p-3 bg-red-100 rounded-xl hover:bg-red-200 transition-colors duration-200"
              >
                <LogOut className="h-5 w-5 text-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className={`p-3 rounded-xl bg-${stat.color}-100 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Submit */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit New Collection</h2>

              {/* Status Message */}
              {submitMessage && (
                <div className={`mb-6 p-4 rounded-xl flex items-center space-x-2 ${
                  submitStatus === 'success'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {submitStatus === 'success' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                  <span>{submitMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      placeholder="150"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Collection Date</label>
                    <input
                      type="date"
                      name="collectionDate"
                      value={formData.collectionDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                    <input
                      type="number"
                      step="any"
                      name="latitude"
                      value={formData.latitude}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      placeholder="12.9716"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                    <input
                      type="number"
                      step="any"
                      name="longitude"
                      value={formData.longitude}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      placeholder="77.5946"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Water Temperature (°C)</label>
                    <input
                      type="number"
                      step="any"
                      name="waterTemperature"
                      value={formData.waterTemperature}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      placeholder="25.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Water pH</label>
                    <input
                      type="number"
                      step="any"
                      name="waterPh"
                      value={formData.waterPh}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      placeholder="7.2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nutrient Level (0-10)</label>
                    <input
                      type="number"
                      step="any"
                      name="nutrientLevel"
                      value={formData.nutrientLevel}
                      onChange={handleInputChange}
                      min="0"
                      max="10"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      placeholder="5.5"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sunlight Exposure (0-1)</label>
                    <input
                      type="number"
                      step="any"
                      name="sunlightExposure"
                      value={formData.sunlightExposure}
                      onChange={handleInputChange}
                      min="0"
                      max="1"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      placeholder="0.8"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Water Flow Rate</label>
                    <input
                      type="number"
                      step="any"
                      name="waterFlowRate"
                      value={formData.waterFlowRate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                      placeholder="2.1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Water Body Type</label>
                    <select
                      name="waterBodyType"
                      value={formData.waterBodyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    >
                      <option value="lake">Lake</option>
                      <option value="river">River</option>
                      <option value="pond">Pond</option>
                      <option value="reservoir">Reservoir</option>
                      <option value="canal">Canal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Season</label>
                    <select
                      name="season"
                      value={formData.season}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    >
                      <option value="summer">Summer</option>
                      <option value="monsoon">Monsoon</option>
                      <option value="winter">Winter</option>
                      <option value="spring">Spring</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      {imagePreview ? (
                        <div className="flex flex-col items-center">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-24 w-24 object-cover rounded-lg mb-4"
                          />
                          <Camera className="h-8 w-8 text-emerald-500 mb-2" />
                          <p className="text-emerald-600 font-medium">Click to change image</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Camera className="h-12 w-12 text-gray-400 mb-4" />
                          <p className="text-gray-600 mb-2">Click to upload photos of your collection</p>
                          <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="h-5 w-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Submit Collection</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Recent Submissions */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Submissions</h2>
              
              <div className="space-y-4">
                {recentSubmissions.map((submission, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Package className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{submission.amount}</div>
                        <div className="text-sm text-gray-600">{submission.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-emerald-600">{submission.earnings}</div>
                      <div className={`text-sm px-2 py-1 rounded-full ${
                        submission.status === 'Verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {submission.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Rewards & Progress */}
          <div className="space-y-8">
            {/* Progress Overview */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Monthly Progress</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-emerald-600">247 kg</div>
                <div className="text-sm text-gray-600">of 300 kg goal</div>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-4 mb-2">
                <div className="bg-emerald-600 h-4 rounded-full w-4/5 transition-all duration-500"></div>
              </div>
              <div className="text-sm text-gray-600 text-center">82% complete</div>
            </div>

            {/* Available Rewards */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Available Rewards</h3>
              
              <div className="space-y-4">
                {availableRewards.map((reward, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{reward.name}</span>
                      <span className="text-sm font-bold text-emerald-600">{reward.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${reward.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600">
                      {reward.current} / {reward.required}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Find Collection Points</span>
                </button>
                
                <button className="w-full bg-amber-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Award className="h-4 w-4" />
                  <span>View All Rewards</span>
                </button>
                
                <button 
                  onClick={() => navigate('/#marketplace')}
                  className="w-full bg-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200"
                >
                  Shop Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};