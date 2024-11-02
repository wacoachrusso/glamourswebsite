import React, { useState } from 'react';
import { Download } from 'lucide-react';
import RevenueChart from './RevenueChart';
import ServicePerformance from './ServicePerformance';
import StaffPerformance from './StaffPerformance';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('revenue');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="flex items-center px-4 py-2 bg-glamour-gold text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="flex space-x-4">
        {['revenue', 'services', 'staff', 'clients'].map((type) => (
          <button
            key={type}
            onClick={() => setReportType(type)}
            className={`px-4 py-2 rounded-lg capitalize ${
              reportType === type
                ? 'bg-glamour-gold text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Report Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <RevenueChart />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Service Performance</h2>
          <ServicePerformance />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Staff Performance</h2>
          <StaffPerformance />
        </div>
      </div>
    </div>
  );
};

export default Reports;