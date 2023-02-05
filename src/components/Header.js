import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useState, useContext } from 'react';
import { Spin as Hamburger } from 'hamburger-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faRandom, faSearch, faSortAmountAsc, faGlobe, faUser } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext } from '../context/LanguageProvider';
import { withLanguage } from '../components/HOC/withLanguage';
import { QRCodeGenerator } from './QRCodeGenerator';
import { BiQr } from 'react-icons/bi';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

function Header({ texts }) {
  const [isOpen, setOpen] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth.email) {
      setShowLogin(true);
    } else setShowLogin(false);
  }, [auth]);

  return (
    <div>
      <nav className="mx-auto hidden items-center justify-between bg-gray-800 md:flex md:flex-row md:items-center md:justify-start">
        <div className="flex flex-1 items-center">
          <Link to="/">
            <p className="text-white">
              <strong className="text-2xl">Memes</strong>
              <br /> alfa version
            </p>
          </Link>
          <button className="ml-20 hidden md:flex" onClick={() => setShowQRCode(!showQRCode)}>
            {<BiQr className="text-2xl text-orange-600" />}
            {showQRCode && <QRCodeGenerator />}
          </button>
        </div>
        <NavItem to="/" text={texts.browse} icon={faRandom} />
        <NavItem to="/sort" text={texts.sortMemes} icon={faSortAmountAsc} />
        <NavItem to="/generatemem" text={texts.generateMeme} icon={faPlusSquare} />
        {showLogin ? (
          <NavItem to="/login" text={texts.logIn} icon={faUser} />
        ) : (
          <p className="absolute left-[20%] text-white">
            {texts.hi}, {auth.userNick}
          </p>
        )}
        <button className="mt-2 mr-6 flex flex-col text-orange-500" onClick={() => setLanguage(language === 'en' ? 'pl' : 'en')}>
          {<FontAwesomeIcon size="lg" icon={faGlobe} />}
          {language.toUpperCase()}
        </button>
      </nav>
      <div className="fixed z-10 rounded-lg bg-black md:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} color="#f97316" duration={0.6} label="Menu" />
        {isOpen && (
          <>
            <header className="flex max-h-full flex-nowrap items-center justify-end rounded-lg bg-gray-800 md:block ">
              <div className="flex flex-col">
                <NavItem to="/sort" text={texts.sortMemes} icon={faSortAmountAsc} />
                <NavItem to="/" text={texts.browse} icon={faRandom} />
                <NavItem to="/generatemem" text={texts.generateMeme} icon={faPlusSquare} />
              </div>
            </header>
            <button className=" absolute top-3 left-14 text-orange-500" onClick={() => setLanguage(language === 'en' ? 'pl' : 'en')}>
              {<FontAwesomeIcon size="lg" icon={faGlobe} />}
            </button>
            {showLogin && (
              <Link to="/login" className="absolute top-3 left-24 text-orange-500" icon={faUser}>
                <FontAwesomeIcon size="lg" icon={faUser} />
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function NavItem({ to, text, icon }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link to={to} className={`rounded-lg p-2 text-white md:mr-5 ${active ? 'bg-orange-500 text-black' : ''}`}>
      <FontAwesomeIcon className="mr-5" icon={icon} />
      {text}
    </Link>
  );
}

export default withLanguage(Header);
