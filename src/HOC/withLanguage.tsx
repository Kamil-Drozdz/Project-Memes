import { useContext, FunctionComponent } from 'react';
import { LanguageContext } from '../context/LanguageProvider';
import { texts } from '../translations/translations';

type LanguageKeys = keyof typeof texts;
type WrappedComponentProps = any;

export const withLanguage = (WrappedComponent: FunctionComponent<WrappedComponentProps>) => {
  return (props: any) => {
    const { language } = useContext(LanguageContext) as { language: LanguageKeys };

    return <WrappedComponent {...props} language={language} texts={texts[language]} />;
  };
};
