import { FC } from 'react';

interface MetricDetailProps {
  metricId: string;
}

const MetricDetail: FC<MetricDetailProps> = ({ metricId }) => {
  const renderContent = () => {
    switch (metricId) {
      case 'clients':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">New Clients</h3>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-green-600">+15% this month</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Returning Clients</h3>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-green-600">82% retention rate</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">VIP Clients</h3>
                <p className="text-2xl font-bold">50</p>
                <p className="text-sm text-green-600">21% of total clients</p>
              </div>
            </div>
          </div>
        );

      case 'revenue':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Daily Revenue</h3>
                <p className="text-2xl font-bold">$1,250</p>
                <p className="text-sm text-green-600">+8% vs yesterday</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Weekly Revenue</h3>
                <p className="text-2xl font-bold">$8,450</p>
                <p className="text-sm text-green-600">+12% vs last week</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</h3>
                <p className="text-2xl font-bold">$32,750</p>
                <p className="text-sm text-green-600">+15% vs last month</p>
              </div>
            </div>
          </div>
        );

      case 'appointments':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Today's Appointments</h3>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-green-600">85% confirmed</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">This Week</h3>
                <p className="text-2xl font-bold">182</p>
                <p className="text-sm text-green-600">90% occupancy</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 mb-1">Next Week</h3>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-green-600">75% booked</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-6">
            <p className="text-gray-500 text-center">Select a metric to view details</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      {renderContent()}
    </div>
  );
};

export default MetricDetail;