import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Star,
  X 
} from 'lucide-react';
import AppointmentsList from './AppointmentsList';
import RevenueChart from './RevenueChart';
import MetricsCard from './MetricsCard';
import MetricDetail from './MetricDetail';

const DashboardStats: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const metrics = [
    {
      id: 'clients',
      title: "Active Clients",
      value: "234",
      change: "+12%",
      icon: Users,
      trend: "up" as const
    },
    {
      id: 'revenue',
      title: "Monthly Revenue",
      value: "$12,450",
      change: "+8%",
      icon: DollarSign,
      trend: "up" as const
    },
    {
      id: 'appointments',
      title: "Appointments",
      value: "182",
      change: "+15%",
      icon: Calendar,
      trend: "up" as const
    },
    {
      id: 'service-time',
      title: "Avg. Service Time",
      value: "45min",
      change: "-5%",
      icon: Clock,
      trend: "down" as const
    },
    {
      id: 'rating',
      title: "Customer Rating",
      value: "4.8",
      change: "+0.2",
      icon: Star,
      trend: "up" as const
    },
    {
      id: 'growth',
      title: "Growth Rate",
      value: "23%",
      change: "+5%",
      icon: TrendingUp,
      trend: "up" as const
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border rounded-lg text-sm">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricsCard 
            key={metric.id}
            {...metric}
            onClick={() => setSelectedMetric(metric.id)}
          />
        ))}
      </div>

      {/* Charts and Lists */}
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

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {metrics.find(m => m.id === selectedMetric)?.title} Details
              </h2>
              <button
                onClick={() => setSelectedMetric(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <MetricDetail metricId={selectedMetric} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;