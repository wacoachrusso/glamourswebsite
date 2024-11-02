import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  isScrolled: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ isScrolled }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className={`flex items-center space-x-2 transition-colors ${
        isScrolled
          ? 'text-gray-600 hover:text-glamour-gold'
          : 'text-white hover:text-glamour-gold'
      }`}
      aria-label={t('language.switch')}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">{t('language.current')}</span>
    </button>
  );
};

export default LanguageSwitcher;