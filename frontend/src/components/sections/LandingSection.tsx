import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, ShoppingBag } from 'lucide-react';

export const LandingSection: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            From <span className="text-emerald-600">Weed</span> to{' '}
            <span className="text-amber-600">Wealth</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transforming invasive water hyacinth into income, clean energy, and community growth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button 
            onClick={() => navigate('/farmer-registration')}
            className="group bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Users className="h-6 w-6" />
            <span>Contribute as Farmer</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          
          <button 
            onClick={() => scrollToSection('marketplace')}
            className="group bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <ShoppingBag className="h-6 w-6" />
            <span>Shop Eco Products</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-emerald-600 mb-2">2,500+</div>
            <div className="text-gray-700 font-medium">Farmers Empowered</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-blue-600 mb-2">50,000</div>
            <div className="text-gray-700 font-medium">Tons Collected</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl font-bold text-amber-600 mb-2">15</div>
            <div className="text-gray-700 font-medium">Communities Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};