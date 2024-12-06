import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { getStats } from '../../../utils/statsManager';

interface StylistRevenueProps {
  stylistName: string;
}

const StylistRevenue: React.FC<StylistRevenueProps> = ({ stylistName }) => {
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month'>('day');
  const stats = getStats();
  const stylistStats = stats.stylistStats[stylistName];

  // Calculate revenue by service type
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
    .filter((apt: any) => apt.selectedProfessional === stylistName);

  const serviceRevenue = appointments.reduce((acc: any, apt: any) => {
    const serviceName = apt.service.name;
    if (!acc[serviceName]) {
      acc[serviceName] = {
        total: 0,
        count: 0
      };
    }
    acc[serviceName].total += parseFloat(apt.service.price || '0');
    acc[serviceName].count++;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <Calendar className="w-8 h-8 text-glamour-gold" />
            <span className="text-sm text-green-600">+8% this month</span>
          </div>
          <p className="text-sm text-gray-600">Average Per Service</p>
          <p className="text-2xl font-bold">
            ${(stylistStats.revenue / stylistStats.appointments || 0).toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-glamour-gold" />
            <span className="text-sm text-green-600">+15% this month</span>
          </div>
          <p className="text-sm text-gray-600">Monthly Growth</p>
          <p className="text-2xl font-bold">15%</p>
        </div>
      </div>

      {/* Revenue by Service */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Revenue by Service</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {Object.entries(serviceRevenue).map(([service, data]: [string, any], index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">{service}</span>
                  <span className="text-sm font-medium">${data.total.toFixed(2)}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-glamour-gold rounded-full"
                    style={{ width: `${(data.total / stylistStats.revenue) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {data.count} appointments
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistRevenue;