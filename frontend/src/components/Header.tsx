import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sprout } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'farmer', label: 'Farmers' },
    { id: 'marketplace', label: 'Shop' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'impact', label: 'Impact' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <Sprout className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-bold text-gray-900">HyacinthFlow</span>
          </button>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-200 hover:text-emerald-600 ${
                  activeSection === item.id ? 'text-emerald-600' : 'text-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex space-x-4">
            <button 
              onClick={() => navigate('/get-started')}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};