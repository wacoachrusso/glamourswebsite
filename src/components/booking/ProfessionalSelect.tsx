import React from 'react';
import { UserCheck } from 'lucide-react';

interface ProfessionalSelectProps {
  selectedProfessional: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProfessionalSelect: React.FC<ProfessionalSelectProps> = ({ selectedProfessional, onChange }) => {
  const professionals = [
    {
      id: "sarah-johnson",
      name: "Sarah Johnson",
      role: "Master Stylist",
      specialties: ["Color Specialist", "Precision Cuts"]
    },
    {
      id: "michael-chen",
      name: "Michael Chen",
      role: "Senior Stylist",
      specialties: ["Asian Hair", "Men's Styling"]
    },
    {
      id: "isabella-rodriguez",
      name: "Isabella Rodriguez",
      role: "Texture Specialist",
      specialties: ["Curly Hair", "Natural Hair"]
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <UserCheck className="w-5 h-5 mr-2" />
        Choose Your Stylist
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {professionals.map((professional) => (
          <div key={professional.id}>
            <input
              type="radio"
              id={professional.id}
              name="selectedProfessional"
              value={professional.id}
              checked={selectedProfessional === professional.id}
              onChange={onChange}
              className="hidden peer"
              required
            />
            <label
              htmlFor={professional.id}
              className="block p-4 bg-white border rounded-lg cursor-pointer transition-all duration-200
                peer-checked:border-glamour-gold peer-checked:ring-2 peer-checked:ring-glamour-gold/50
                hover:border-glamour-gold/50"
            >
              <h3 className="font-medium text-gray-900">{professional.name}</h3>
              <p className="text-sm text-glamour-gold">{professional.role}</p>
              <div className="mt-2">
                <p className="text-xs text-gray-500">Specialties:</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {professional.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSelect;