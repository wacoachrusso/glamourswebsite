import React from 'react';
import { Scissors } from 'lucide-react';
import { services } from '../../data/services';
import { IMAGES } from '../../config/images';

interface ServiceSelectProps {
  selectedService: string;
  onChange: (serviceId: string) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ selectedService, onChange }) => {
  const serviceImages = {
    'womens-haircut': IMAGES.services.hairCuts.women,
    'color-highlights': IMAGES.services.specialOccasions.main,
    'brazilian-blowout': IMAGES.services.keratina.main,
    'mens-haircut': IMAGES.services.hairCuts.women2,
    'balayage': IMAGES.services.balayage.main,
    'deep-conditioning': IMAGES.services.hairCuts.women3,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <Scissors className="w-5 h-5 mr-2" />
        Select Your Service
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => onChange(service.id)}
            className={`group cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
              selectedService === service.id ? 'scale-[1.02]' : ''
            }`}
          >
            <div
              className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                selectedService === service.id
                  ? 'border-glamour-gold shadow-lg'
                  : 'border-transparent shadow hover:shadow-lg'
              }`}
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={serviceImages[service.id as keyof typeof serviceImages]}
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
                <p className="text-sm text-white/90 mb-2">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-black/30 px-2 py-1 rounded">
                    {service.duration} mins
                  </span>
                  <span className="text-lg font-semibold">${service.price}</span>
                </div>
              </div>

              <div
                className={`absolute inset-0 border-4 rounded-lg transition-opacity duration-300 pointer-events-none ${
                  selectedService === service.id
                    ? 'border-glamour-gold opacity-100'
                    : 'border-transparent opacity-0'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelect;
