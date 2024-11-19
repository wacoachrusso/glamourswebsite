import React from 'react';

interface ProfessionalSelectProps {
  selectedProfessional: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfessionalSelect: React.FC<ProfessionalSelectProps> = ({ selectedProfessional, onChange }) => {
  const professionals = [
    { name: 'John Doe', image: '/path/to/john-doe.jpg' },
    { name: 'Jane Smith', image: '/path/to/jane-smith.jpg' },
    { name: 'Sarah Johnson', image: '/path/to/sarah-johnson.jpg' },
    { name: 'Michael Chen', image: '/path/to/michael-chen.jpg' },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-glamour-dark mb-4">Choose Your Stylist</h2>
      <div className="grid grid-cols-2 gap-4">
        {professionals.map((professional) => (
          <label
            key={professional.name}
            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer ${
              selectedProfessional === professional.name
                ? 'border-glamour-gold bg-glamour-light'
                : 'border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="selectedProfessional"
              value={professional.name}
              checked={selectedProfessional === professional.name}
              onChange={onChange}
              className="hidden"
            />
            <img
              src={professional.image}
              alt={professional.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <span className="text-gray-700 font-medium">{professional.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSelect;
