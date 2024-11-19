import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface DateTimeSelectProps {
  appointmentDate: string;
  appointmentTime: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeSelect: React.FC<DateTimeSelectProps> = ({ appointmentDate, appointmentTime, onChange }) => {
  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 3 months from now as the maximum selectable date
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const timeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <Calendar className="w-5 h-5 mr-2" />
        Select Date & Time
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
            Preferred Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={appointmentDate}
              onChange={onChange}
              min={minDate}
              max={maxDateStr}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-glamour-gold/50 focus:border-glamour-gold"
              required
            />
          </div>
          <p className="text-sm text-gray-500">Select a date within the next 3 months</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Time
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <div key={time}>
                <input
                  type="radio"
                  id={`time-${time}`}
                  name="appointmentTime"
                  value={time}
                  checked={appointmentTime === time}
                  onChange={onChange}
                  className="hidden peer"
                  required
                />
                <label
                  htmlFor={`time-${time}`}
                  className="flex items-center justify-center px-2 py-2 border rounded-lg cursor-pointer text-sm
                    peer-checked:border-glamour-gold peer-checked:bg-glamour-gold peer-checked:text-white
                    hover:border-glamour-gold/50 transition-colors"
                >
                  {time}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelect;