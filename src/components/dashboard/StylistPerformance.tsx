import React from 'react';
import { Star, TrendingUp, Users, DollarSign } from 'lucide-react';

interface StylistStats {
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  clientRetentionRate: number;
}

interface StylistPerformanceProps {
  stylistName: string;
}

const StylistPerformance: React.FC<StylistPerformanceProps> = ({ stylistName }) => {
  // Calculate stats from localStorage bookings
  const calculateStats = (): StylistStats => {
    const allBookings = JSON.parse(localStorage.getItem('appointments') || '[]');
    const stylistBookings = allBookings.filter((booking: any) => 
      booking.selectedProfessional === stylistName
    );

    const totalRevenue = stylistBookings.reduce((sum: number, booking: any) => 
      sum + parseFloat(booking.service.price || '0'), 0
    );

    // For demo purposes, generate some random stats
    return {
      totalBookings: stylistBookings.length,
      totalRevenue,
      averageRating: 4.8,
      clientRetentionRate: 85
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark">
        Performance Metrics for {stylistName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-glamour-gold mr-3" />
            <h3 className="text-lg font-semibold">Total Bookings</h3>
          </div>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <DollarSign className="w-8 h-8 text-glamour-gold mr-3" />
            <h3 className="text-lg font-semibold">Revenue</h3>
          </div>
          <p className="text-2xl font-bold">${stats.totalRevenue}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Star className="w-8 h-8 text-glamour-gold mr-3" />
            <h3 className="text-lg font-semibold">Rating</h3>
          </div>
          <p className="text-2xl font-bold">{stats.averageRating}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 text-glamour-gold mr-3" />
            <h3 className="text-lg font-semibold">Retention</h3>
          </div>
          <p className="text-2xl font-bold">{stats.clientRetentionRate}%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Client Satisfaction</span>
            <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-[95%] h-full bg-glamour-gold rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Booking Rate</span>
            <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-[85%] h-full bg-glamour-gold rounded-full" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Service Quality</span>
            <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="w-[90%] h-full bg-glamour-gold rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistPerformance;