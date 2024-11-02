import React from 'react';

const RevenueChart: React.FC = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Monthly Revenue</h3>
          <p className="text-sm text-gray-600">Last 6 months</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-glamour-gold">$24,500</p>
          <p className="text-sm text-green-600">+12% vs last period</p>
        </div>
      </div>
      
      {/* Placeholder for actual chart */}
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Revenue chart visualization will be displayed here</p>
      </div>
    </div>
  );
};

export default RevenueChart;