import { useAuth } from '../../hooks/useAuth';
import { Dispatch, useEffect, SetStateAction } from 'react';
import { LanguageContext, LanguageContextType } from '../../context/LanguageProvider';
import { useState, useContext } from 'react';
import { SubscriptionContext, SubscriptionContextType } from '../../context/SubscriptionProvider';
import { withLanguage } from '../../HOC/withLanguage';
import Header from './Header';

export interface HeaderContainerProps{
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
  auth?: { userNick: string | null };
  texts: {
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
  const { language, setLanguage } = useContext(LanguageContext) as LanguageContextType;
  const { subscription } = useContext(SubscriptionContext) as SubscriptionContextType;
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { auth } = useAuth();
  const [pingModal, setPingModal] = useState(true);

  useEffect(() => {
    if (!auth.email) {
      setShowLogin(true);
    } else setShowLogin(false);
  }, [auth]);

  return <Header {...{ texts, isOpen, setOpen, language, setLanguage, subscription, showQRCode, setShowQRCode, showLogin, showInfoModal, setShowInfoModal, auth, pingModal, setPingModal }} />;
};

export default withLanguage(HeaderContainer);
