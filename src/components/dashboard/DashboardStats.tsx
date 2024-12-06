import React, { useEffect } from 'react';
import { Users, Calendar, DollarSign, Clock, TrendingUp, Star } from 'lucide-react';
import AppointmentsList from './AppointmentsList';
import RevenueChart from './RevenueChart';
import StatsResetButton from './StatsResetButton';
import { getStats, updateStatsFromBookings } from '../../utils/statsManager';

const DashboardStats: React.FC = () => {
  useEffect(() => {
    // Update stats whenever dashboard is loaded
    updateStatsFromBookings();
  }, []);

  const stats = getStats();

  const metrics = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toFixed(2)}`,
      change: "+8%",
      icon: DollarSign,
      trend: "up" as const
    },
    {
      title: "Total Appointments",
      value: stats.totalAppointments.toString(),
      change: "+15%",
      icon: Calendar,
      trend: "up" as const
    },
    {
      title: "Active Clients",
      value: stats.totalClients.toString(),
      change: "+12%",
      icon: Users,
      trend: "up" as const
    },
    {
      title: "Avg. Service Time",
      value: `${Math.round(stats.averageServiceTime)}min`,
      change: "-5%",
      icon: Clock,
      trend: "down" as const
    },
    {
      title: "Client Retention",
      value: `${Math.round(stats.clientRetentionRate)}%`,
      change: "+3%",
      icon: TrendingUp,
      trend: "up" as const
    },
    {
      title: "Avg. Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      trend: "up" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <StatsResetButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-glamour-gold/10 rounded-lg">
                  <Icon className="w-6 h-6 text-glamour-gold" />
                </div>
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">{metric.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Revenue Trends</h2>
          <RevenueChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <AppointmentsList />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;