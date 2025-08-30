import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Filter } from 'lucide-react';

export const MarketplaceSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products', icon: '🌿' },
    { id: 'handicrafts', name: 'Handicrafts', icon: '🧺' },
    { id: 'textiles', name: 'Textiles', icon: '🧵' },
    { id: 'mats', name: 'Mats & Rugs', icon: '🪢' },
    { id: 'bags', name: 'Bags & Accessories', icon: '🎒' }
  ];

  const products = [
    {
      id: 1,
      name: 'Handwoven Basket Set',
      price: '₹1,250',
      image: 'https://images.pexels.com/photos/4792065/pexels-photo-4792065.jpeg',
      category: 'handicrafts',
      rating: 4.8,
      artisan: 'Maya Collective'
    },
    {
      id: 2,
      name: 'Eco-Fiber Table Runner',
      price: '₹850',
      image: 'https://images.pexels.com/photos/6186810/pexels-photo-6186810.jpeg',
      category: 'textiles',
      rating: 4.9,
      artisan: 'Green Weaves'
    },
    {
      id: 3,
      name: 'Water Hyacinth Floor Mat',
      price: '₹2,100',
      image: 'https://images.pexels.com/photos/6969141/pexels-photo-6969141.jpeg',
      category: 'mats',
      rating: 4.7,
      artisan: 'River Craft Co.'
    },
    {
      id: 4,
      name: 'Sustainable Shoulder Bag',
      price: '₹1,650',
      image: 'https://images.pexels.com/photos/7691691/pexels-photo-7691691.jpeg',
      category: 'bags',
      rating: 4.9,
      artisan: 'EcoStyle Studio'
    },
    {
      id: 5,
      name: 'Decorative Wall Hanging',
      price: '₹950',
      image: 'https://images.pexels.com/photos/6207624/pexels-photo-6207624.jpeg',
      category: 'handicrafts',
      rating: 4.6,
      artisan: 'Artisan Alliance'
    },
    {
      id: 6,
      name: 'Natural Fiber Cushion',
      price: '₹750',
      image: 'https://images.pexels.com/photos/6207677/pexels-photo-6207677.jpeg',
      category: 'textiles',
      rating: 4.8,
      artisan: 'Comfort Crafts'
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section id="marketplace" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Shop <span className="text-emerald-600">Sustainable</span>, Support Communities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every purchase supports farmers and artisans while protecting our environment.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 shadow-md hover:shadow-lg'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            <span>✓</span>
            <span>Eco-friendly</span>
          </div>
          <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <span>✓</span>
            <span>Handmade</span>
          </div>
          <div className="flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
            <span>✓</span>
            <span>Community Impact</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                </button>
                <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Sustainable
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">by {product.artisan}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-emerald-600">{product.price}</span>
                  <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors duration-200 flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};