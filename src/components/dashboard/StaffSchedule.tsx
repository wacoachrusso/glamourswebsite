import React from 'react';

interface StaffScheduleProps {
  date: Date;
  viewMode: string;
}

const StaffSchedule: React.FC<StaffScheduleProps> = () => {
  return (
    <div className="p-6">
      <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Staff schedule will be displayed here</p>
      </div>
    </div>
  );
};

export default StaffSchedule;