import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Star, ShoppingCart, Truck, Shield, Recycle } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app this would come from API
  const product = {
    id: 1,
    name: 'Handwoven Water Hyacinth Basket Set',
    price: 1250,
    originalPrice: 1500,
    rating: 4.8,
    reviews: 127,
    artisan: 'Maya Collective',
    location: 'Kerala, India',
    description: 'Beautiful handwoven basket set crafted from sustainably sourced water hyacinth fiber. Each piece is unique and supports local artisan communities while helping clean our waterways.',
    features: [
      'Made from 100% water hyacinth fiber',
      'Handwoven by skilled artisans',
      'Set of 3 different sizes',
      'Naturally antimicrobial',
      'Biodegradable and eco-friendly'
    ],
    images: [
      'https://images.pexels.com/photos/4792065/pexels-photo-4792065.jpeg',
      'https://images.pexels.com/photos/6186810/pexels-photo-6186810.jpeg',
      'https://images.pexels.com/photos/6969141/pexels-photo-6969141.jpeg'
    ],
    inStock: true,
    deliveryTime: '5-7 days'
  };

  const relatedProducts = [
    {
      id: 2,
      name: 'Eco-Fiber Table Runner',
      price: 850,
      image: 'https://images.pexels.com/photos/6186810/pexels-photo-6186810.jpeg',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Natural Floor Mat',
      price: 2100,
      image: 'https://images.pexels.com/photos/6969141/pexels-photo-6969141.jpeg',
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="max-w-7xl mx-auto py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/#marketplace')}
          className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 font-medium mb-8 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Marketplace</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl shadow-xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="flex space-x-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index ? 'border-emerald-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                  <span className="font-semibold text-gray-900">{product.rating}</span>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
                <div className="text-gray-600">by {product.artisan}</div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-emerald-600">₹{product.price}</span>
                <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
              <h3 className="font-semibold text-emerald-800 mb-3">Environmental Impact</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Recycle className="h-4 w-4" />
                  <span>2.5 kg hyacinth used</span>
                </div>
                <div className="flex items-center space-x-2 text-emerald-700">
                  <Shield className="h-4 w-4" />
                  <span>Supports 3 families</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>
              
              <button className="p-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <Heart className="h-6 w-6 text-gray-600 hover:text-red-500" />
              </button>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Truck className="h-4 w-4" />
                <span>Free delivery in {product.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Quality guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group cursor-pointer">
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-emerald-600">₹{relatedProduct.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};