import { useLanguageStore } from '../store/useLanguageStore';

export function useTranslation() {
  const { currentLanguage, translations } = useLanguageStore();

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[currentLanguage];
  };

  return { t, currentLanguage };
}