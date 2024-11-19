import React from 'react';

interface ServiceSelectProps {
  selectedService: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ServiceSelect: React.FC<ServiceSelectProps> = ({ selectedService, onChange }) => {
  return (
    <div className="form-group">
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
        <option value="Color">Color</option>
        <option value="Style">Style</option>
      </select>
    </div>
  );
};

export default ServiceSelect;
