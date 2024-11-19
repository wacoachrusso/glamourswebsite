import React from 'react';
import { Scissors } from 'lucide-react';

interface ServiceSelectProps {
  selectedService: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ selectedService, onChange }) => {
  const services = [
    { value: "womens-haircut", label: "Women's Haircut & Style", duration: "60 min", price: "$85" },
    { value: "mens-haircut", label: "Men's Haircut & Style", duration: "45 min", price: "$45" },
    { value: "color-highlights", label: "Color & Highlights", duration: "120 min", price: "$175" },
    { value: "balayage", label: "Balayage", duration: "180 min", price: "$200" },
    { value: "brazilian-blowout", label: "Brazilian Blowout", duration: "180 min", price: "$300" },
    { value: "special-occasion", label: "Special Occasion Style", duration: "90 min", price: "$85" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <Scissors className="w-5 h-5 mr-2" />
        Select Service
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <div key={service.value}>
            <input
              type="radio"
              id={service.value}
              name="selectedService"
              value={service.value}
              checked={selectedService === service.value}
              onChange={onChange}
              className="hidden peer"
              required
            />
            <label
              htmlFor={service.value}
              className="block p-4 bg-white border rounded-lg cursor-pointer transition-all duration-200
                peer-checked:border-glamour-gold peer-checked:ring-2 peer-checked:ring-glamour-gold/50
                hover:border-glamour-gold/50"
            >
              <h3 className="font-medium text-gray-900">{service.label}</h3>
              <div className="mt-1 flex justify-between text-sm">
                <span className="text-gray-500">{service.duration}</span>
                <span className="text-glamour-gold font-medium">{service.price}</span>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelect;