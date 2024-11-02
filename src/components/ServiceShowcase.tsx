import React from 'react';
import { Sparkles, Scissors, Heart, Crown } from 'lucide-react';

const categories = [
  {
    title: 'Hair Design',
    services: [
      'Custom Haircuts & Styling',
      'Creative Color Design',
      'Balayage & Highlights',
      'Bridal & Special Event',
      'Extensions & Hair Additions',
      'Textured Hair Specialists'
    ],
    icon: Scissors
  },
  {
    title: 'Color Artistry',
    services: [
      'Fashion Colors',
      'Color Correction',
      'Dimensional Highlights',
      'Root Touch-ups',
      'Gloss Treatments',
      'Color Protection'
    ],
    icon: Sparkles
  },
  {
    title: 'Luxury Treatments',
    services: [
      'Keratin Smoothing',
      'Deep Conditioning',
      'Scalp Treatments',
      'Bond Building',
      'Hair Restoration',
      'Custom Hair Masks'
    ],
    icon: Crown
  }
];

const ServiceShowcase: React.FC = () => {
  return (
    <div className="my-16">
      <h2 className="text-3xl font-bold text-center text-glamour-dark mb-8">Experience Excellence</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Icon className="w-8 h-8 text-glamour-gold mr-2" />
                <h3 className="text-xl font-semibold text-glamour-gold">{category.title}</h3>
              </div>
              <ul className="space-y-3">
                {category.services.map((service, serviceIndex) => (
                  <li key={serviceIndex} className="flex items-center text-gray-700">
                    <Heart className="w-4 h-4 text-glamour-pink mr-2" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="text-center text-gray-600 mt-6">
        Schedule a consultation to discuss your unique style goals and receive a personalized service recommendation.
      </p>
    </div>
  );
};

export default ServiceShowcase;