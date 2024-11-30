import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../types/language';

export function LanguageToggle() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'en' ? 'es' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
      aria-label={t('language.select')}
    >
      <Globe className="h-5 w-5 text-gray-500" />
      <span>{currentLanguage === 'en' ? 'EN' : 'ES'}</span>
    </button>
  );
}