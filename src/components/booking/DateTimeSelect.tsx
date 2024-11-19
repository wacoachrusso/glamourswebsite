import React from 'react';

interface DateTimeSelectProps {
  appointmentDate: string;
  appointmentTime: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeSelect: React.FC<DateTimeSelectProps> = ({ appointmentDate, appointmentTime, onChange }) => {
  return (
    <div>
      <label>Appointment Date:</label>
      <input
        type="date"
        name="appointmentDate"
        value={appointmentDate}
        onChange={onChange}
        required
      />
      <label>Appointment Time:</label>
      <input
        type="time"
        name="appointmentTime"
        value={appointmentTime}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default DateTimeSelect;
