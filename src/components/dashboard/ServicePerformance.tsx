import React from 'react';

const ServicePerformance: React.FC = () => {
  const services = [
    { name: "Women's Haircut & Style", bookings: 45, revenue: 3825 },
    { name: "Color & Highlights", bookings: 32, revenue: 5600 },
    { name: "Brazilian Blowout", bookings: 18, revenue: 5400 },
    { name: "Men's Haircut & Style", bookings: 38, revenue: 1710 }
  ];

  return (
    <div className="space-y-4">
      {services.map((service, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{service.name}</h4>
            <span className="text-sm text-gray-600">{service.bookings} bookings</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-glamour-gold rounded-full"
                style={{ width: `${(service.bookings / 50) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">${service.revenue}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicePerformance;