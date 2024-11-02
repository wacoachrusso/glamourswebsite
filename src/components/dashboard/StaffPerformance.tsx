import React from 'react';
import { Star } from 'lucide-react';

const StaffPerformance: React.FC = () => {
  const staff = [
    { 
      name: "Sarah Johnson",
      role: "Master Stylist",
      clients: 28,
      rating: 4.9,
      revenue: 4250
    },
    {
      name: "Michael Chen",
      role: "Senior Stylist",
      clients: 24,
      rating: 4.8,
      revenue: 3800
    },
    {
      name: "Isabella Rodriguez",
      role: "Texture Specialist",
      clients: 22,
      rating: 4.7,
      revenue: 3600
    }
  ];

  return (
    <div className="space-y-4">
      {staff.map((member, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-medium">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium">{member.rating}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div>
              <p className="text-sm text-gray-600">Clients</p>
              <p className="font-medium">{member.clients}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="font-medium">${member.revenue}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffPerformance;