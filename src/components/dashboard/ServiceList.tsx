import React from 'react';

const ServiceList: React.FC = () => {
  const services = [
    { name: "Women's Haircut & Style", duration: "60 min", price: "$85" },
    { name: "Color & Highlights", duration: "120 min", price: "$175" },
    { name: "Brazilian Blowout", duration: "180 min", price: "$300" },
    { name: "Men's Haircut & Style", duration: "45 min", price: "$45" }
  ];

  return (
    <div className="p-6">
      <div className="space-y-4">
        {services.map((service, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{service.name}</h4>
                <p className="text-sm text-gray-600">{service.duration}</p>
              </div>
              <span className="font-medium text-glamour-gold">{service.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceList;