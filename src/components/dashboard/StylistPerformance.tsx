import React from 'react';
import { Star, TrendingUp, Users, DollarSign, Calendar, Clock, Award } from 'lucide-react';
import { getStats } from '../../utils/statsManager';

interface StylistPerformanceProps {
  stylistName: string;
}

const StylistPerformance: React.FC<StylistPerformanceProps> = ({ stylistName }) => {
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

  const calculateCompletionRate = () => {
    const total = stylistStats.completedAppointments + stylistStats.canceledAppointments;
    return total > 0 ? (stylistStats.completedAppointments / total) * 100 : 0;
  };

  const metrics = [
    {
      title: 'Total Revenue',
      value: `$${stylistStats.revenue.toFixed(2)}`,
      icon: DollarSign,
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Total Clients',
      value: stylistStats.clients.size.toString(),
      icon: Users,
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Completion Rate',
      value: `${calculateCompletionRate().toFixed(1)}%`,
      icon: Award,
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Avg. Service Time',
      value: `${Math.round(stylistStats.averageServiceTime)} min`,
      icon: Clock,
      change: '-3%',
      trend: 'down'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark">
        Performance Metrics for {stylistName}
      </h2>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-glamour-gold/10 rounded-lg">
                  <Icon className="w-6 h-6 text-glamour-gold" />
                </div>
                <span className={`ml-auto text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-sm text-gray-600">{metric.title}</h3>
              <p className="text-2xl font-bold mt-1">{metric.value}</p>
            </div>
          );
        })}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Appointment Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="text-sm font-medium text-green-600">
                  {stylistStats.completedAppointments}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(stylistStats.completedAppointments / stylistStats.appointments) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="text-sm font-medium text-yellow-600">
                  {stylistStats.pendingAppointments}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${(stylistStats.pendingAppointments / stylistStats.appointments) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Cancelled</span>
                <span className="text-sm font-medium text-red-600">
                  {stylistStats.canceledAppointments}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${(stylistStats.canceledAppointments / stylistStats.appointments) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Performance Ratings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Ratings</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Client Satisfaction</span>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{stylistStats.rating}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${(stylistStats.rating / 5) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">On-time Performance</span>
                <span className="text-sm font-medium">98%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-glamour-gold rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">Rebooking Rate</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-glamour-gold rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistPerformance;