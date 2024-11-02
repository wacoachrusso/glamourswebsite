import React from 'react';

const services = [
  {
    category: 'Hair Services',
    items: [
      { name: 'Women\'s Haircut & Style', price: '$85+' },
      { name: 'Men\'s Haircut & Style', price: '$45+' },
      { name: 'Children\'s Haircut (12 & under)', price: '$35+' },
      { name: 'Blowout & Style', price: '$55+' },
      { name: 'Special Occasion Style', price: '$85+' },
      { name: 'Hair Extensions Consultation', price: 'Free' }
    ]
  },
  {
    category: 'Color Services',
    items: [
      { name: 'Single Process Color', price: '$95+' },
      { name: 'Partial Highlights', price: '$125+' },
      { name: 'Full Highlights', price: '$175+' },
      { name: 'Balayage', price: '$200+' },
      { name: 'Color Correction', price: 'Consultation Required' },
      { name: 'Gloss Treatment', price: '$45+' }
    ]
  },
  {
    category: 'Treatment Services',
    items: [
      { name: 'Deep Conditioning', price: '$35+' },
      { name: 'Keratin Treatment', price: '$250+' },
      { name: 'Brazilian Blowout', price: '$300+' },
      { name: 'Scalp Treatment', price: '$45+' },
      { name: 'Olaplex Treatment', price: '$50+' }
    ]
  }
];

const PriceList: React.FC = () => {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Service Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((category, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-pink-600 mb-4">{category.category}</h3>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between items-center">
                  <span className="text-gray-700">{item.name}</span>
                  <span className="text-gray-900 font-semibold">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-gray-600 mt-6">
        * Prices may vary based on hair length, thickness, and service complexity.
        Please schedule a consultation for accurate pricing.
      </p>
    </div>
  );
};

export default PriceList;