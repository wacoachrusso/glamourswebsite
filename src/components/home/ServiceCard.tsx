import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  link
}) => {
  const { t } = useLanguage();

  return (
    <Link
      to={link}
      className={`bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 ${
        isHovered ? 'scale-105 shadow-lg' : ''
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Icon className={`w-12 h-12 mx-auto mb-4 transition-colors duration-300 ${
        isHovered ? 'text-glamour-gold' : 'text-glamour-pink'
      }`} />
      <h3 className="text-xl font-semibold mb-2 text-center">{t(title)}</h3>
      <p className="text-gray-600 text-center">{t(description)}</p>
    </Link>
  );
};

export default ServiceCard;