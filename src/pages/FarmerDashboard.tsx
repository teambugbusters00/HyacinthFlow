import React, { useState } from 'react';
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
  LogOut
} from 'lucide-react';

export const FarmerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                    placeholder="150"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-500 transition-colors duration-200">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload photos of your collection</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </div>

              <button className="w-full bg-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Submit Collection</span>
              </button>
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