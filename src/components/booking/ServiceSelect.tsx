import React from 'react';
import { services } from '../../data/services';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
}

interface ServiceSelectProps {
  selectedService: string;
  onChange: (serviceId: string) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ selectedService, onChange }) => {
  return (
    <div className="service-select-container">
      {services.map((service: Service) => (
        <div
          key={service.id}
          onClick={() => onChange(service.id)}
          className={`service-label flex items-center mb-4 p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
            selectedService === service.id ? 'bg-glamour-gold border-glamour-gold text-white' : 'bg-white border-gray-300'
          } hover:bg-gray-100`}
        >
          <div className="service-content flex items-center">
            <img
              src={`/images/services/${service.id}.jpg`}
              alt={service.name}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
            <div>
              <h3 className="font-semibold text-lg">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
              <p className="text-sm text-gray-800 font-semibold">
                {service.duration} min - ${service.price}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSelect;
