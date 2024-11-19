import React from 'react';

interface ServiceSelectProps {
  selectedService: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ selectedService, onChange }) => {
  return (
    <div>
      <label htmlFor="service">Select Service:</label>
      <select
        id="service"
        name="selectedService"
        value={selectedService}
        onChange={onChange}
        required
      >
        <option value="">Select a service...</option>
        <option value="Haircut">Haircut</option>
        <option value="Hair Color">Hair Color</option>
      </select>
    </div>
  );
};

export default ServiceSelect;
