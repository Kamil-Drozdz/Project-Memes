import { texts } from '../translations/translations';
import { useLanguage } from '../hooks/useLanguage';
import { FunctionComponent } from 'react';

type LanguageKeys = keyof typeof texts;
type WrappedComponentProps = any;

export const withLanguage = (WrappedComponent: FunctionComponent<WrappedComponentProps>) => {
  return (props: any) => {
    const { language } = useLanguage() as { language: LanguageKeys };

    return <WrappedComponent {...props} language={language} texts={texts[language]} />;
  };
};
