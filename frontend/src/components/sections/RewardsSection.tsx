import React from 'react';
import { Hammer, Scaling as Seedling, Zap, DollarSign } from 'lucide-react';

export const RewardsSection: React.FC = () => {
  const rewardTiers = [
    {
      icon: Seedling,
      title: 'Starter Tools',
      items: ['Seeds & Saplings', 'Basic Hand Tools', 'Small Garden Kits'],
      threshold: '100-500 kg',
      color: 'emerald'
    },
    {
      icon: Hammer,
      title: 'Growth Boosters',
      items: ['Fertilizer Packs', 'Water Pumps', 'Advanced Tools'],
      threshold: '500-1500 kg',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Sustainability Kits',
      items: ['Biogas Unit', 'Solar Dryer', 'Processing Equipment'],
      threshold: '1500+ kg',
      color: 'amber'
    }
  ];

  return (
    <section id="rewards" className="py-20 px-4 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Growing Together with <span className="text-emerald-600">Rewards</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {rewardTiers.map((tier, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <div className={`p-4 rounded-xl bg-${tier.color}-100 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <tier.icon className={`h-12 w-12 text-${tier.color}-600`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                {tier.title}
              </h3>
              
              <div className={`text-center text-${tier.color}-600 font-semibold mb-6`}>
                {tier.threshold}
              </div>
              
              <ul className="space-y-3">
                {tier.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-600">
                    <div className={`w-2 h-2 bg-${tier.color}-600 rounded-full mr-3`}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <div className="text-center mb-8">
            <DollarSign className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Revenue Sharing Model</h3>
            <p className="text-gray-600 leading-relaxed">
              Choose your preferred model for biogas energy sales and maximize your earnings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-emerald-50 p-6 rounded-xl border-2 border-emerald-200">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-emerald-600">70/30</div>
                <div className="text-sm text-gray-600">Farmer / Platform</div>
              </div>
              <p className="text-gray-700 text-center">
                Higher farmer share with basic support
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-blue-600">80/20</div>
                <div className="text-sm text-gray-600">Farmer / Platform</div>
              </div>
              <p className="text-gray-700 text-center">
                Maximum farmer earnings with premium benefits
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};