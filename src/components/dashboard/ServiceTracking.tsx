import { FC, useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import ServiceList from './ServiceList';
import StaffSchedule from './StaffSchedule';
import ResourceAllocation from './ResourceAllocation';

interface ServiceStats {
  title: string;
  value: string;
  subtext: string;
  icon: typeof Calendar | typeof Clock | typeof Users;
}

const ServiceTracking: FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day');

  const stats: ServiceStats[] = [
    {
      title: "Today's Services",
      value: "24",
      subtext: "8 completed, 16 upcoming",
      icon: Calendar
    },
    {
      title: "Avg. Service Time",
      value: "45m",
      subtext: "5min faster than last week",
      icon: Clock
    },
    {
      title: "Staff Available",
      value: "8/10",
      subtext: "2 on break",
      icon: Users
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Service Tracking</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="day">Day View</option>
            <option value="week">Week View</option>
            <option value="month">Month View</option>
          </select>
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="px-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Icon className="w-6 h-6 text-glamour-gold mr-3" />
                <h3 className="text-lg font-semibold">{stat.title}</h3>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-1">{stat.subtext}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Service Schedule</h2>
            </div>
            <StaffSchedule 
              date={selectedDate}
              viewMode={viewMode}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Resource Allocation</h2>
            </div>
            <ResourceAllocation />
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Service List</h2>
            </div>
            <ServiceList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceTracking;