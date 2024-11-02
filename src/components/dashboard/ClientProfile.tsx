import React from 'react';
import { Calendar, DollarSign, Clock, MessageSquare } from 'lucide-react';

interface ClientProfileProps {
  clientId: number | null;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ clientId }) => {
  if (!clientId) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">Select a client to view their profile</p>
      </div>
    );
  }

  // Mock client data
  const client = {
    id: clientId,
    name: "Emma Thompson",
    email: "emma@example.com",
    phone: "(555) 123-4567",
    joinDate: "2023-06-15",
    totalSpent: 1250,
    lastVisit: "2024-03-01",
    upcomingAppointment: "2024-03-20",
    preferredServices: ["Women's Haircut & Style", "Color & Highlights"],
    notes: "Prefers afternoon appointments. Allergic to certain hair dyes."
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Client Profile</h2>
      </div>
      <div className="p-6 space-y-6">
        {/* Basic Info */}
        <div>
          <h3 className="font-medium mb-3">Basic Information</h3>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-gray-600">Name:</span> {client.name}
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Email:</span> {client.email}
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Phone:</span> {client.phone}
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Client since:</span> {new Date(client.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <DollarSign className="w-5 h-5 text-glamour-gold mb-2" />
            <p className="text-sm text-gray-600">Total Spent</p>
            <p className="text-lg font-semibold">${client.totalSpent}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-glamour-gold mb-2" />
            <p className="text-sm text-gray-600">Last Visit</p>
            <p className="text-lg font-semibold">{new Date(client.lastVisit).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Preferred Services */}
        <div>
          <h3 className="font-medium mb-3">Preferred Services</h3>
          <div className="space-y-2">
            {client.preferredServices.map((service, index) => (
              <div key={index} className="text-sm bg-gray-50 p-2 rounded">
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h3 className="font-medium mb-3">Notes</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">{client.notes}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-4">
          <button className="flex-1 flex items-center justify-center px-4 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <Clock className="w-4 h-4 mr-2" />
            Book Appointment
          </button>
          <button className="flex-1 flex items-center justify-center px-4 py-2 border border-glamour-gold text-glamour-gold rounded-lg hover:bg-glamour-light transition-colors">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;