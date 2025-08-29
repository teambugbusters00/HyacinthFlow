import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Award, Zap, TrendingUp } from 'lucide-react';

export const FarmerSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="farmer" className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Your Harvest, Your <span className="text-emerald-600">Rewards</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Farmers collect and deliver hyacinth in 100 kg batches. Every contribution brings rewards — 
            from essential tools to clean energy systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-6">
              <Package className="h-8 w-8 text-emerald-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Contribution Counter</h3>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-emerald-600 mb-2">1,247</div>
              <div className="text-gray-600">Kilograms Submitted</div>
            </div>
            
            <div className="bg-emerald-50 p-4 rounded-xl">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>This Month</span>
                <span>247 kg</span>
              </div>
              <div className="w-full bg-emerald-200 rounded-full h-3">
                <div className="bg-emerald-600 h-3 rounded-full w-3/4 transition-all duration-300"></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="flex items-center mb-6">
              <Award className="h-8 w-8 text-amber-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Rewards Progress</h3>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Next Reward: Biogas Kit</span>
                <span className="text-sm font-bold text-amber-600">80%</span>
              </div>
              <div className="w-full bg-amber-200 rounded-full h-4">
                <div className="bg-amber-600 h-4 rounded-full w-4/5 transition-all duration-500 relative">
                  <div className="absolute right-0 top-0 h-4 w-2 bg-amber-400 rounded-r-full animate-pulse"></div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mt-2">200 kg remaining</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-green-700">Earning Rate</div>
                <div className="text-lg font-bold text-green-600">₹15/kg</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Zap className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-blue-700">Energy Generated</div>
                <div className="text-lg font-bold text-blue-600">2.5 kWh</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={() => navigate('/farmer-registration')}
            className="bg-emerald-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Register as Farmer
          </button>
        </div>
      </div>
    </section>
  );
};