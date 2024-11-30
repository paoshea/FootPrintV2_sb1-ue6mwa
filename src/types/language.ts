export type Language = 'en' | 'es';

export interface Translation {
  [key: string]: {
    en: string;
    es: string;
  };
}

export interface LanguageState {
  currentLanguage: Language;
  translations: Translation;
}