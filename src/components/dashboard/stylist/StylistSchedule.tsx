import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User } from 'lucide-react';
import { getStats } from '../../../utils/statsManager';

interface StylistScheduleProps {
  stylistName: string;
}

const StylistSchedule: React.FC<StylistScheduleProps> = ({ stylistName }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
    .filter((apt: any) => 
      apt.selectedProfessional === stylistName &&
      apt.appointmentDate === selectedDate
    )
    .sort((a: any, b: any) => a.appointmentTime.localeCompare(b.appointmentTime));

  const getStatusColor = (status: string): string => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED': return 'text-green-600 bg-green-50';
      case 'PENDING': return 'text-yellow-600 bg-yellow-50';
      case 'CANCELLED': return 'text-red-600 bg-red-50';
      case 'COMPLETED': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
          />
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'day' | 'week')}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
          >
            <option value="day">Day View</option>
            <option value="week">Week View</option>
          </select>
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Daily Schedule</h2>
        </div>
        <div className="divide-y">
          {appointments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No appointments scheduled for this day
            </div>
          ) : (
            appointments.map((apt: any, index: number) => (
              <div key={index} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Clock className="w-5 h-5 text-glamour-gold" />
                    </div>
                    <div>
                      <p className="font-medium">{apt.appointmentTime}</p>
                      <p className="text-sm text-gray-600">{apt.service.name}</p>
                      <div className="flex items-center mt-2">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <p className="text-sm text-gray-600">{apt.clientName}</p>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StylistSchedule;