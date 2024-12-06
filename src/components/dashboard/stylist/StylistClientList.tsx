import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { getStats } from '../../../utils/statsManager';

interface StylistClientListProps {
  stylistName: string;
}

const StylistClientList: React.FC<StylistClientListProps> = ({ stylistName }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const stats = getStats();
  const stylistStats = stats.stylistStats[stylistName];

  // Get all appointments for this stylist
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
    .filter((apt: any) => apt.selectedProfessional === stylistName);

  // Create client map with visit history
  const clientMap = new Map();
  appointments.forEach((apt: any) => {
    if (!clientMap.has(apt.clientEmail)) {
      clientMap.set(apt.clientEmail, {
        name: apt.clientName,
        email: apt.clientEmail,
        phone: apt.clientPhone,
        visits: [],
        totalSpent: 0
      });
    }
    const client = clientMap.get(apt.clientEmail);
    client.visits.push({
      date: apt.appointmentDate,
      service: apt.service.name,
      price: parseFloat(apt.service.price || '0')
    });
    client.totalSpent += parseFloat(apt.service.price || '0');
  });

  const clients = Array.from(clientMap.values());

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
        />
      </div>

      {/* Client List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Client List</h2>
        </div>
        <div className="divide-y">
          {filteredClients.map((client, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.email}</p>
                  <p className="text-sm text-gray-600">{client.phone}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Total Spent: ${client.totalSpent.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Visits: {client.visits.length}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Services</h4>
                <div className="space-y-2">
                  {client.visits.slice(-3).reverse().map((visit: any, visitIndex: number) => (
                    <div key={visitIndex} className="text-sm text-gray-600 flex justify-between">
                      <span>{visit.service}</span>
                      <span>{new Date(visit.date).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylistClientList;