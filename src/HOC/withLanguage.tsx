import { useSelector } from 'react-redux';
import { texts } from '../translations/translations';
import { FunctionComponent } from 'react';
import { RootState } from '../store/authSlice';

type LanguageKeys = keyof typeof texts;
type WrappedComponentProps = any;

export const withLanguage = (WrappedComponent: FunctionComponent<WrappedComponentProps>) => {
  return (props: any) => {
    const language = useSelector((state: RootState) => state.language) as LanguageKeys;

    return <WrappedComponent {...props} language={language} texts={texts[language]} />;
  };
};
