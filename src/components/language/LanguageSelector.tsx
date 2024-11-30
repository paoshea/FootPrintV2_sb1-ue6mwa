import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useTranslation } from '../../hooks/useTranslation';
import type { Language } from '../../types/language';

export function LanguageSelector() {
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { t } = useTranslation();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: t('language.english') },
    { code: 'es', label: t('language.spanish') },
  ];

  return (
    <div className="relative inline-block">
      <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md cursor-pointer">
        <Globe className="h-5 w-5 text-gray-500" />
        <select
          value={currentLanguage}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="appearance-none bg-transparent border-none focus:ring-0 cursor-pointer"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}