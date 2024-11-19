import React from 'react';

interface ProfessionalSelectProps {
  selectedProfessional: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProfessionalSelect: React.FC<ProfessionalSelectProps> = ({ selectedProfessional, onChange }) => {
  return (
    <div>
      <label>Stylist:</label>
      <select
        name="selectedProfessional"
        value={selectedProfessional}
        onChange={onChange}
        required
      >
        <option value="">Select a stylist...</option>
        <option value="John Doe">John Doe</option>
        <option value="Jane Smith">Jane Smith</option>
      </select>
    </div>
  );
};

export default ProfessionalSelect;
