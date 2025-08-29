import React from 'react';
import { Waves, Recycle, Package } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const journeySteps = [
    {
      icon: Waves,
      title: 'Collected from lakes & rivers',
      description: 'Farmers harvest invasive water hyacinth from waterways, helping restore aquatic ecosystems.',
      color: 'text-blue-600'
    },
    {
      icon: Recycle,
      title: 'Processed into eco-friendly fiber',
      description: 'Advanced processing transforms the plant into sustainable, high-quality fiber materials.',
      color: 'text-emerald-600'
    },
    {
      icon: Package,
      title: 'Transformed into sustainable products',
      description: 'Skilled artisans create beautiful, durable products that support local communities.',
      color: 'text-amber-600'
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Water Hyacinth?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Water hyacinth clogs waterways and harms ecosystems. But with innovation, this problem becomes 
            an opportunity — creating jobs, products, and cleaner water.
          </p>
        </div>

        <div className="space-y-16">
          {journeySteps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12`}
            >
              <div className="flex-1">
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl bg-gray-50 ${step.color} mr-4`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="text-sm font-semibold text-gray-500">
                      Step {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="aspect-video bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl shadow-lg flex items-center justify-center">
                  <div className={`p-8 rounded-full bg-white shadow-lg ${step.color}`}>
                    <step.icon className="h-16 w-16" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};