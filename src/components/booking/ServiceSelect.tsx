import React from 'react';
import { Scissors } from 'lucide-react';

interface ServiceSelectProps {
  selectedService: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ selectedService, onChange }) => {
  const services = [
    { id: 'womens-cut', name: "Women's Haircut & Style", price: '$85+', duration: '60 min' },
    { id: 'mens-cut', name: "Men's Haircut & Style", price: '$45+', duration: '45 min' },
    { id: 'color', name: 'Color & Highlights', price: '$175+', duration: '120 min' },
    { id: 'balayage', name: 'Balayage', price: '$200+', duration: '180 min' },
    { id: 'brazilian', name: 'Brazilian Blowout', price: '$300+', duration: '180 min' },
    { id: 'special', name: 'Special Occasion Style', price: '$85+', duration: '60 min' },
    { id: 'treatment', name: 'Deep Conditioning Treatment', price: '$35+', duration: '30 min' },
    { id: 'kids-cut', name: "Children's Haircut", price: '$35+', duration: '30 min' }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <Scissors className="w-5 h-5 mr-2" />
        Select Service
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <label
            key={service.id}
            className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedService === service.name
                ? 'border-glamour-gold bg-glamour-light shadow-md'
                : 'border-gray-200 hover:border-glamour-gold/50'
            }`}
          >
            <input
              type="radio"
              name="selectedService"
              value={service.name}
              checked={selectedService === service.name}
              onChange={onChange}
              className="absolute top-4 right-4 h-4 w-4 text-glamour-gold focus:ring-glamour-gold"
            />
            <div className="ml-2">
              <h3 className="font-medium text-gray-900">{service.name}</h3>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span className="mr-4">{service.price}</span>
                <span>{service.duration}</span>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelect;