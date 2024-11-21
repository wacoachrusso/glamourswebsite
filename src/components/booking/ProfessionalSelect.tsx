import React from 'react';
import { Scissors } from 'lucide-react';

interface ProfessionalSelectProps {
  selectedProfessional: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfessionalSelect: React.FC<ProfessionalSelectProps> = ({ selectedProfessional, onChange }) => {
  const professionals = [
    {
      name: 'Angie Padilla',
      role: 'Master Stylist & Owner',
      specialties: ['Color Specialist', 'Hair Design', 'Special Occasions'],
      experience: '22+ years'
    },
    {
      name: 'Sarah Johnson',
      role: 'Senior Stylist',
      specialties: ['Precision Cuts', 'Wedding Styles'],
      experience: '8 years'
    },
    {
      name: 'Isabella Rodriguez',
      role: 'Texture Specialist',
      specialties: ['Curly Hair', 'Natural Hair'],
      experience: '10 years'
    },
    {
      name: 'Michael Chen',
      role: 'Color Artist',
      specialties: ['Balayage', 'Creative Color'],
      experience: '6 years'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-glamour-dark flex items-center">
        <Scissors className="w-5 h-5 mr-2" />
        Choose Your Stylist
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {professionals.map((professional) => (
          <label
            key={professional.name}
            className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
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
              className="hidden"
            />
            <div className="flex items-start space-x-4">
              {professional.name === 'Angie Padilla' ? (
                <img
                  src="https://images.unsplash.com/photo-1601931935821-5fbe71157695?auto=format&fit=crop&w=800&q=80"
                  alt={professional.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-glamour-gold/10 flex items-center justify-center">
                  <Scissors className="w-8 h-8 text-glamour-gold" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{professional.name}</h3>
                <p className="text-sm text-glamour-gold">{professional.role}</p>
                <p className="text-sm text-gray-600 mt-1">Experience: {professional.experience}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {professional.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-glamour-gold/10 text-glamour-gold rounded-full"
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
      
      <p className="text-sm text-gray-500 mt-2">
        All our stylists are professionally trained and certified. Choose any stylist or select "No Preference" for the next available professional.
      </p>
    </div>
  );
};

export default ProfessionalSelect;