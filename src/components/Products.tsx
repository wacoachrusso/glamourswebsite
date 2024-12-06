import React from 'react';
import { Star, Shield, Award } from 'lucide-react';
import { IMAGES } from '../config/images';

const Products: React.FC = () => {
  const products = [
    {
      category: 'Hair Care',
      items: [
        {
          name: 'Kerastase Luxury Hair Care',
          description: 'Professional-grade shampoos, conditioners, and treatments',
          image: IMAGES.services.hairCuts.women
        },
        {
          name: 'Olaplex Treatment System',
          description: 'Revolutionary bond-building hair care products',
          image: IMAGES.services.balayage.main
        }
      ]
    },
    {
      category: 'Styling Products',
      items: [
        {
          name: 'Moroccan Oil Collection',
          description: 'Luxury oils and styling products for all hair types',
          image: IMAGES.services.specialOccasions.main
        },
        {
          name: 'Professional Styling Tools',
          description: 'High-end brushes, combs, and accessories',
          image: IMAGES.services.braids.main
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-glamour-dark mb-6">
          Professional Beauty Products
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Experience the difference with our curated selection of premium beauty products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Star className="w-12 h-12 text-glamour-gold mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
          <p className="text-gray-600">Only the finest beauty products from trusted brands</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Shield className="w-12 h-12 text-glamour-gold mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Guaranteed Authentic</h3>
          <p className="text-gray-600">100% authentic products from authorized distributors</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Award className="w-12 h-12 text-glamour-gold mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Expert Selection</h3>
          <p className="text-gray-600">Carefully chosen by our professional stylists</p>
        </div>
      </div>

      {products.map((category, index) => (
        <div key={index} className="mb-16">
          <h2 className="text-2xl font-bold text-glamour-dark mb-8">
            {category.category}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-64">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-glamour-dark mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;