import { Dispatch, useEffect, SetStateAction } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage as setLanguageAction } from '../../store/languageSlice';
import { withLanguage } from '../../HOC/withLanguage';
import Header from './Header';
import { RootState } from '../../store/authSlice';

export interface HeaderContainerProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  language: string;
  setLanguage: (value: string) => void | undefined;
  subscription: any;
  showQRCode: boolean;
  setShowQRCode: (value: boolean) => void;
  showLogin: boolean;
  showInfoModal: boolean;
  setShowInfoModal: (value: boolean) => void;
  pingModal: boolean;
  setPingModal: (value: boolean) => void;
  userNick: string | null;
  texts: {
    myProfil: string;
    hi: string;
    browse: string;
    sortMemes: string;
    logIn: string;
    generateMeme: string;
    projectDocumentation: string;
    features: string;
    close: string;
    projectDocs: { MemeGeneration: string; SortingOptions: string; features: string; accessAndAuthorization: string; info: string; revenueModel: string; backendDevelopment: string; introduction: string; HOC: string; accesAndAuthotrization: string };
  };
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ texts }) => {
  const [isOpen, setOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { email, userNick } = useSelector((state: RootState) => state.auth);
  const language = useSelector((state: RootState) => state.language);
  const subscription = useSelector((state: RootState) => state.subscription);
  const dispatch = useDispatch();
  const setLanguage = (lang: string) => {
    dispatch(setLanguageAction(lang));
  };

  const [pingModal, setPingModal] = useState(true);

  useEffect(() => {
    if (!email) {
      setShowLogin(true);
    } else setShowLogin(false);
  }, [email]);

  return <Header {...{ texts, isOpen, setOpen, language, setLanguage, subscription, showQRCode, setShowQRCode, showLogin, showInfoModal, setShowInfoModal, userNick, pingModal, setPingModal }} />;
};

export default withLanguage(HeaderContainer);
