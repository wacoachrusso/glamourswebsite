import React, { useState } from 'react';
import { Search, Filter, Download, Plus } from 'lucide-react';
import ClientList from './ClientList';
import ClientProfile from './ClientProfile';

const ClientManagement: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Client Management</h1>
        <button className="flex items-center px-4 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Add New Client
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold appearance-none bg-white"
            >
              <option value="all">All Clients</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="vip">VIP</option>
            </select>
          </div>
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-2">
          <ClientList 
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onSelectClient={setSelectedClient}
            selectedClient={selectedClient}
          />
        </div>

        {/* Client Profile */}
        <div className="lg:col-span-1">
          <ClientProfile clientId={selectedClient} />
        </div>
      </div>
    </div>
  );
};

export default ClientManagement;