import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { isHolidayDate, isTimeSlotAvailable } from '../../utils/dateUtils';

interface DateTimeSelectProps {
  appointmentDate: string;
  appointmentTime: string;
  serviceDuration: number;
  selectedProfessional: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeSelect: React.FC<DateTimeSelectProps> = ({
  appointmentDate,
  appointmentTime,
  serviceDuration,
  selectedProfessional,
  onChange,
}) => {
  const [existingAppointments, setExistingAppointments] = useState<any[]>([]);
  const [holidayWarning, setHolidayWarning] = useState<string | null>(null);

  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // Get date 3 months from now as the maximum selectable date
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  maxDate.setHours(23, 59, 59, 999);

  useEffect(() => {
    // Load existing appointments from localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    setExistingAppointments(appointments);
  }, [appointmentDate]); // Reload when date changes

  // Available base time slots
  const baseTimeSlots = [
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"
  ];

  // Custom handler for DayPicker that properly handles timezone
  const handleDaySelect = (day: Date | undefined) => {
    if (day) {
      // Check if it's a holiday
      const { isHoliday, holidayName } = isHolidayDate(day);
      if (isHoliday) {
        setHolidayWarning(`Note: The salon might be closed on ${holidayName}. Please call (973) 344-5199 to confirm availability.`);
      } else {
        setHolidayWarning(null);
      }

      // Create a new date object and set it to midnight in local timezone
      const localDate = new Date(day);
      localDate.setHours(0, 0, 0, 0);
      
      const event = {
        target: {
          name: 'appointmentDate',
          value: localDate.toISOString().split('T')[0]
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);

      // Clear time when date changes
      const timeEvent = {
        target: {
          name: 'appointmentTime',
          value: ''
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(timeEvent);
    }
  };

  // Disable past dates and dates beyond 3 months
  const disabledDays = [
    { before: tomorrow },
    { after: maxDate }
  ];

  // Filter available time slots based on existing appointments and service duration
  const getAvailableTimeSlots = () => {
    if (!appointmentDate || !serviceDuration) return [];
    
    return baseTimeSlots.filter(time => 
      isTimeSlotAvailable(
        appointmentDate, 
        time, 
        serviceDuration, 
        existingAppointments,
        selectedProfessional
      )
    );
  };

  // Custom CSS for the calendar
  const calendarClassNames = {
    months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
    month: 'space-y-4',
    caption: 'flex justify-center pt-1 relative items-center',
    caption_label: 'text-sm font-medium text-gray-900',
    nav: 'space-x-1 flex items-center',
    nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
    nav_button_previous: 'absolute left-1',
    nav_button_next: 'absolute right-1',
    table: 'w-full border-collapse space-y-1',
    head_row: 'flex',
    head_cell: 'text-gray-500 rounded-md w-9 font-normal text-[0.8rem]',
    row: 'flex w-full mt-2',
    cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-glamour-light first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
    day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
    day_selected: 'bg-glamour-gold text-white hover:bg-glamour-gold hover:text-white focus:bg-glamour-gold focus:text-white',
    day_today: 'bg-gray-100',
    day_outside: 'text-gray-300 opacity-50',
    day_disabled: 'text-gray-300',
    day_range_middle: 'aria-selected:bg-glamour-light aria-selected:text-gray-900',
    day_hidden: 'invisible',
  };

  // Parse the selected date for the calendar
  const selectedDate = appointmentDate ? new Date(appointmentDate + 'T00:00:00') : undefined;
  const availableTimeSlots = getAvailableTimeSlots();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <CalendarIcon className="w-5 h-5 mr-2" />
        Select Date & Time
      </h2>

      {holidayWarning && (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2 text-yellow-700 mb-6">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{holidayWarning}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDaySelect}
            disabled={disabledDays}
            showOutsideDays={false}
            classNames={calendarClassNames}
            modifiersClassNames={{
              selected: 'bg-glamour-gold text-white hover:bg-glamour-gold hover:text-white focus:bg-glamour-gold focus:text-white'
            }}
            fromDate={tomorrow}
            toDate={maxDate}
          />
        </div>

        {/* Time Slots */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Available Time Slots
          </h3>
          <div className="grid grid-cols-3 gap-2 max-h-[400px] overflow-y-auto p-1">
            {availableTimeSlots.map((time) => (
              <label
                key={time}
                className={`relative flex items-center justify-center p-2 border rounded-lg cursor-pointer transition-all duration-300 ${
                  appointmentTime === time
                    ? 'border-glamour-gold bg-glamour-light shadow-md'
                    : 'border-gray-200 hover:border-glamour-gold/50'
                }`}
              >
                <input
                  type="radio"
                  name="appointmentTime"
                  value={time}
                  checked={appointmentTime === time}
                  onChange={onChange}
                  className="sr-only"
                />
                <Clock className="w-4 h-4 mr-1 text-gray-400" />
                <span className="text-sm">{time}</span>
              </label>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            All appointments are in Eastern Time (ET)
          </p>
          {appointmentDate && availableTimeSlots.length === 0 && (
            <p className="text-sm text-red-600 mt-2">
              No available time slots for this date. Please select another date.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelect;