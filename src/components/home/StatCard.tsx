import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-duration-300">
      <h3 className="text-3xl font-bold text-glamour-gold mb-2">{number}</h3>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

export default StatCard;