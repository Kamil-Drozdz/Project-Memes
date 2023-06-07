import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageProvider';
import { texts } from '../translations/translations';

export const withLanguage = (WrappedComponent) => {
  return (props) => {
    const { language } = useContext(LanguageContext);

    return (
      <div>
        <WrappedComponent {...props} language={language} texts={texts[language]} />
      </div>
    );
  };
};
