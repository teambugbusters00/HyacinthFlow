import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ShoppingBag, Handshake, TrendingUp, ArrowRight } from 'lucide-react';

export const GetStarted: React.FC = () => {
  const navigate = useNavigate();

  const pathways = [
    {
      icon: Users,
      title: 'Become a Farmer',
      description: 'Collect water hyacinth and earn rewards while helping the environment',
      benefits: ['Earn ₹15 per kg', 'Get farming tools', 'Access to biogas kits', 'Community support'],
      action: () => navigate('/farmer-registration'),
      buttonText: 'Register as Farmer',
      color: 'emerald'
    },
    {
      icon: ShoppingBag,
      title: 'Shop Eco Products',
      description: 'Purchase sustainable products made from water hyacinth fiber',
      benefits: ['Unique handmade items', 'Support communities', 'Eco-friendly materials', 'Quality guarantee'],
      action: () => navigate('/#marketplace'),
      buttonText: 'Browse Products',
      color: 'blue'
    },
    {
      icon: Handshake,
      title: 'Partner with Us',
      description: 'Join as a business partner or investor in our sustainable mission',
      benefits: ['Business opportunities', 'Impact investment', 'Technology access', 'Market expansion'],
      action: () => navigate('/#contact'),
      buttonText: 'Become Partner',
      color: 'amber'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-emerald-50 via-blue-50 to-amber-50">
      <div className="max-w-6xl mx-auto py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your <span className="text-emerald-600">Path</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join our ecosystem in the way that fits you best. Every role contributes to transforming 
            communities and protecting our environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {pathways.map((pathway, index) => (
            <div 
              key={index} 
              className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`p-6 rounded-2xl bg-${pathway.color}-100 w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <pathway.icon className={`h-12 w-12 text-${pathway.color}-600`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-4">
                {pathway.title}
              </h3>
              
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                {pathway.description}
              </p>

              <div className="space-y-3 mb-8">
                {pathway.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 bg-${pathway.color}-600 rounded-full`}></div>
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={pathway.action}
                className={`w-full bg-${pathway.color}-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-${pathway.color}-700 transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg`}
              >
                <span>{pathway.buttonText}</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors duration-200"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};