import React from 'react';
import { Mail, Phone, Calendar } from 'lucide-react';

interface ClientListProps {
  searchTerm: string;
  filterStatus: string;
  onSelectClient: (id: number) => void;
  selectedClient: number | null;
}

const ClientList: React.FC<ClientListProps> = ({
  searchTerm,
  filterStatus,
  onSelectClient,
  selectedClient
}) => {
  const clients = [
    {
      id: 1,
      name: "Emma Thompson",
      email: "emma@example.com",
      phone: "(555) 123-4567",
      status: "active",
      lastVisit: "2024-03-01",
      totalVisits: 12
    },
    {
      id: 2,
      name: "James Wilson",
      email: "james@example.com",
      phone: "(555) 234-5678",
      status: "vip",
      lastVisit: "2024-03-05",
      totalVisits: 24
    },
    {
      id: 3,
      name: "Sofia Garcia",
      email: "sofia@example.com",
      phone: "(555) 345-6789",
      status: "inactive",
      lastVisit: "2024-02-15",
      totalVisits: 8
    }
  ];

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Client List</h2>
      </div>
      <div className="divide-y">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => onSelectClient(client.id)}
            className={`p-4 cursor-pointer transition-colors ${
              selectedClient === client.id ? 'bg-glamour-light' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{client.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Mail className="w-4 h-4 mr-1" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Phone className="w-4 h-4 mr-1" />
                  {client.phone}
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  client.status === 'vip' ? 'bg-purple-100 text-purple-600' :
                  client.status === 'active' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {client.status.toUpperCase()}
                </span>
                <div className="flex items-center text-sm text-gray-600 mt-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  Last visit: {new Date(client.lastVisit).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientList;