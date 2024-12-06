import React from 'react';
import { Calendar, Clock, Users, DollarSign, Star } from 'lucide-react';
import { getStats } from '../../../utils/statsManager';

interface StylistOverviewProps {
  stylistName: string;
}

const StylistOverview: React.FC<StylistOverviewProps> = ({ stylistName }) => {
  const stats = getStats();
  const stylistStats = stats.stylistStats[stylistName] || {
    revenue: 0,
    appointments: 0,
    clients: new Set(),
    rating: 4.8,
    completedAppointments: 0,
    canceledAppointments: 0,
    pendingAppointments: 0,
    averageServiceTime: 0
  };

  const todayDate = new Date().toISOString().split('T')[0];
  const todayStats = stats.dailyStats[todayDate] || { revenue: 0, appointments: 0 };

  return (
    <div className="space-y-6">
      {/* Today's Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-10 h-10 text-glamour-gold" />
            <div>
              <p className="text-sm text-gray-600">Appointments</p>
              <p className="text-2xl font-bold">{todayStats.appointments}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <DollarSign className="w-10 h-10 text-glamour-gold" />
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-2xl font-bold">${todayStats.revenue}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="w-10 h-10 text-glamour-gold" />
            <div>
              <p className="text-sm text-gray-600">Avg. Service Time</p>
              <p className="text-2xl font-bold">{Math.round(stylistStats.averageServiceTime)} min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-glamour-gold" />
            <span className="text-sm text-green-600">+5% this month</span>
          </div>
          <p className="text-sm text-gray-600">Total Clients</p>
          <p className="text-2xl font-bold">{stylistStats.clients.size}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-glamour-gold" />
            <span className="text-sm text-green-600">+12% this month</span>
          </div>
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold">${stylistStats.revenue.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Star className="w-8 h-8 text-glamour-gold" />
            <span className="text-sm text-green-600">+0.2 this month</span>
          </div>
          <p className="text-sm text-gray-600">Client Rating</p>
          <p className="text-2xl font-bold">{stylistStats.rating}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-glamour-gold" />
            <span className="text-sm text-green-600">+8% this month</span>
          </div>
          <p className="text-sm text-gray-600">Completion Rate</p>
          <p className="text-2xl font-bold">
            {((stylistStats.completedAppointments / stylistStats.appointments) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default StylistOverview;