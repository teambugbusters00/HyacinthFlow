import React from 'react';
import { MapPin, Users, Droplets, Leaf } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const impactStats = [
    {
      icon: Droplets,
      value: '150+',
      label: 'Water Bodies Cleaned',
      color: 'blue'
    },
    {
      icon: Users,
      value: '2,500+',
      label: 'Lives Transformed',
      color: 'emerald'
    },
    {
      icon: Leaf,
      value: '50,000',
      label: 'Tons CO₂ Reduced',
      color: 'green'
    },
    {
      icon: MapPin,
      value: '15',
      label: 'Communities Served',
      color: 'amber'
    }
  ];

  const stories = [
    {
      name: 'Raj Kumar',
      location: 'Kerala',
      quote: 'Water hyacinth collection has doubled my monthly income while helping our lake.',
      image: 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg'
    },
    {
      name: 'Priya Devi',
      location: 'Tamil Nadu',
      quote: 'My handcrafted baskets now reach customers nationwide through this platform.',
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'
    },
    {
      name: 'Suresh Mehta',
      location: 'Gujarat',
      quote: 'The biogas kit transformed our village energy needs and reduced cooking costs.',
      image: 'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg'
    }
  ];

  return (
    <section id="impact" className="py-20 px-4 bg-gradient-to-b from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Communities in <span className="text-emerald-600">Bloom</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From cleaner rivers to thriving artisans, see how water hyacinth is changing lives.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <div className={`p-4 rounded-xl bg-${stat.color}-100 w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
              </div>
              <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-700 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Map Placeholder */}
        <div className="bg-white p-8 rounded-2xl shadow-xl mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Our Growing Network
          </h3>
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-emerald-100 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 200">
                <circle cx="80" cy="60" r="8" fill="#059669" className="animate-pulse" />
                <circle cx="150" cy="90" r="8" fill="#0d9488" className="animate-pulse" />
                <circle cx="220" cy="70" r="8" fill="#059669" className="animate-pulse" />
                <circle cx="300" cy="100" r="8" fill="#0d9488" className="animate-pulse" />
                <circle cx="180" cy="130" r="8" fill="#059669" className="animate-pulse" />
              </svg>
            </div>
            <div className="text-center z-10">
              <MapPin className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700">Interactive Map Coming Soon</p>
              <p className="text-gray-600">Track our impact across regions</p>
            </div>
          </div>
        </div>

        {/* Community Stories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative mb-6">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-emerald-600/10 group-hover:bg-emerald-600/20 transition-colors duration-300"></div>
              </div>
              
              <blockquote className="text-gray-700 text-center mb-6 italic leading-relaxed">
                "{story.quote}"
              </blockquote>
              
              <div className="text-center">
                <div className="font-bold text-gray-900">{story.name}</div>
                <div className="text-sm text-gray-600">{story.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};