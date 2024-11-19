import React from 'react';

interface ServiceSelectProps {
  selectedService: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ selectedService, onChange }) => {
  return (
    <div>
      <label>Service:</label>
      <select
        name="selectedService"
        value={selectedService}
        onChange={onChange}
        required
      >
        <option value="">Select a service...</option>
        <option value="Haircut">Haircut</option>
        <option value="Coloring">Coloring</option>
        <option value="Styling">Styling</option>
      </select>
    </div>
  );
};

export default ServiceSelect;
