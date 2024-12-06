import React, { useState } from 'react';
import StylistBookings from './StylistBookings';
import StylistPerformance from './StylistPerformance';

interface StylistDashboardProps {
  stylistName: string;
}

const StylistDashboard: React.FC<StylistDashboardProps> = ({ stylistName }) => {
  const [activeTab, setActiveTab] = useState<'bookings' | 'performance'>('bookings');

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'bookings'
              ? 'bg-glamour-gold text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'performance'
              ? 'bg-glamour-gold text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Performance
        </button>
      </div>

      {activeTab === 'bookings' ? (
        <StylistBookings stylistName={stylistName} />
      ) : (
        <StylistPerformance stylistName={stylistName} />
      )}
    </div>
  );
};

export default StylistDashboard;