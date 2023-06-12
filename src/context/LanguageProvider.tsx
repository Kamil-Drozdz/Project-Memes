import { ReactNode, createContext, useState } from 'react';

export interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LANGS = ['en', 'pl'];
const BROWSER_LANG = navigator.language.slice(0, 2);

interface LanguageProviderProps {
  children: ReactNode;
}
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState(() => {
    if (SUPPORTED_LANGS.includes(BROWSER_LANG)) {
      return BROWSER_LANG;
    }
    return 'en';
  });

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};
