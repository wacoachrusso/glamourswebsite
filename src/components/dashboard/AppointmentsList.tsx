import React from 'react';
import { Clock } from 'lucide-react';

const AppointmentsList: React.FC = () => {
  const appointments = [
    {
      id: 1,
      time: "10:00 AM",
      clientName: "Emma Thompson",
      service: "Women's Haircut & Style",
      status: "Confirmed"
    },
    {
      id: 2,
      time: "11:30 AM",
      clientName: "James Wilson",
      service: "Men's Haircut & Style",
      status: "Pending"
    },
    {
      id: 3,
      time: "2:00 PM",
      clientName: "Sofia Garcia",
      service: "Color & Highlights",
      status: "Confirmed"
    }
  ];

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Clock className="w-4 h-4 mr-1" />
                {appointment.time}
              </div>
              <h4 className="font-medium">{appointment.clientName}</h4>
              <p className="text-sm text-gray-600">{appointment.service}</p>
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              appointment.status === 'Confirmed' 
                ? 'bg-green-100 text-green-600'
                : 'bg-yellow-100 text-yellow-600'
            }`}>
              {appointment.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentsList;