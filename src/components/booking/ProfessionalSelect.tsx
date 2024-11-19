import React from 'react';
import { UserCircle } from 'lucide-react';

interface ProfessionalSelectProps {
  selectedProfessional: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProfessionalSelect: React.FC<ProfessionalSelectProps> = ({ selectedProfessional, onChange }) => {
  const professionals = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Master Stylist",
      specialties: ["Color Specialist", "Precision Cuts"],
      image: "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Senior Stylist",
      specialties: ["Asian Hair Specialist", "Men's Styling"],
      image: "https://images.unsplash.com/photo-1612257460810-e4f31e98d88d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Isabella Rodriguez",
      role: "Texture Specialist",
      specialties: ["Curly Hair", "Extensions"],
      image: "https://images.unsplash.com/photo-1601931935821-5fbe71157695?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <UserCircle className="w-5 h-5 mr-2" />
        Choose Your Stylist
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {professionals.map((professional) => (
          <label
            key={professional.id}
            className={`relative flex flex-col p-4 border rounded-lg cursor-pointer transition-all duration-300 ${
              selectedProfessional === professional.name
                ? 'border-glamour-gold bg-glamour-light shadow-md'
                : 'border-gray-200 hover:border-glamour-gold/50'
            }`}
          >
            <input
              type="radio"
              name="selectedProfessional"
              value={professional.name}
              checked={selectedProfessional === professional.name}
              onChange={onChange}
              className="absolute top-4 right-4 h-4 w-4 text-glamour-gold focus:ring-glamour-gold"
            />
            <div className="flex items-center space-x-4">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{professional.name}</h3>
                <p className="text-sm text-glamour-gold">{professional.role}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {professional.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-glamour-gold/10 text-glamour-gold"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalSelect;