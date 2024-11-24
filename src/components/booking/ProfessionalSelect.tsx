import React from 'react';
import { Scissors, Star } from 'lucide-react';

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
      experience: '22+ years',
      image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'Senior Stylist',
      specialties: ['Precision Cuts', 'Wedding Styles'],
      experience: '8 years',
      image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Isabella Rodriguez',
      role: 'Texture Specialist',
      specialties: ['Curly Hair', 'Natural Hair'],
      experience: '10 years',
      image: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?auto=format&fit=crop&w=800&q=80'
    },
    {
      name: 'Michael Chen',
      role: 'Color Artist',
      specialties: ['Balayage', 'Creative Color'],
      experience: '6 years',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80'
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
              className="sr-only"
            />
            <div className="flex items-start space-x-4">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-16 h-16 rounded-full object-cover"
              />
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

      {/* No Preference Option */}
      <label
        className={`block w-full p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 mt-8 ${
          selectedProfessional === ''
            ? 'border-glamour-gold bg-glamour-light shadow-md'
            : 'border-gray-200 hover:border-glamour-gold/50'
        }`}
      >
        <input
          type="radio"
          name="selectedProfessional"
          value=""
          checked={selectedProfessional === ''}
          onChange={onChange}
          className="sr-only"
        />
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-glamour-gold/10 flex items-center justify-center mr-4">
            <Star className="w-6 h-6 text-glamour-gold" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">No Preference</h3>
            <p className="text-sm text-gray-600">Let us assign the next available professional stylist</p>
          </div>
        </div>
      </label>
      
      <p className="text-sm text-gray-500 mt-2">
        All our stylists are professionally trained and certified. You can choose a specific stylist or select "No Preference" for the next available professional.
      </p>
    </div>
  );
};

export default ProfessionalSelect;