import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  id: string;
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  onClick: () => void;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  trend,
  onClick
}) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-glamour-gold/10 rounded-lg">
          <Icon className="w-6 h-6 text-glamour-gold" />
        </div>
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
};

export default MetricsCard;