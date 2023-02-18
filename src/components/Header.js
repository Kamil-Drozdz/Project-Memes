import { Link, useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { Spin as Hamburger } from 'hamburger-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faRandom, faSearch, faSortAmountAsc, faGlobe, faUser, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { LanguageContext } from '../context/LanguageProvider';
import { withLanguage } from '../components/HOC/withLanguage';
import { QRCodeGenerator } from './QRCodeGenerator';
import { BiQr } from 'react-icons/bi';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import Checkout from '../payments/Checkout';
import { SubscriptionContext } from '../context/SubscriptionProvider';

function Header({ texts }) {
  const [isOpen, setOpen] = useState(false);
  const { language, setLanguage } = useContext(LanguageContext);
  const { subscription } = useContext(SubscriptionContext);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { auth } = useAuth();
  console.log(subscription);
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
          <button
            className="ml-4 rounded-lg bg-black p-1 text-white"
            onClick={() => {
              setShowInfoModal(true);
            }}
          >
            Docs
          </button>
          <button className="ml-20 hidden md:flex" onClick={() => setShowQRCode(!showQRCode)}>
            {<BiQr className="text-2xl text-orange-600" />}
            {showQRCode && <QRCodeGenerator />}
          </button>
        </div>
        <NavItem to="/homepage" text={texts.browse} icon={faRandom} />
        <NavItem to="/sort" text={texts.sortMemes} icon={faSortAmountAsc} />
        <NavItem to="/generatemem" text={texts.generateMeme} icon={faPlusSquare} />
        {showLogin ? (
          <NavItem to="/" text={texts.logIn} icon={faUser} />
        ) : (
          <p className=" absolute left-[25%] text-white">
            {texts.hi}, {auth.userNick}
          </p>
        )}
        {subscription || <Checkout />}
        <button className="z-20 mt-2 mr-6 flex flex-col text-orange-500" onClick={() => setLanguage(language === 'en' ? 'pl' : 'en')}>
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
                <NavItem to="/homepage" text={texts.browse} icon={faRandom} />
                <NavItem to="/generatemem" text={texts.generateMeme} icon={faPlusSquare} />
              </div>
            </header>
            <button className=" absolute top-3 left-14 text-orange-500" onClick={() => setLanguage(language === 'en' ? 'pl' : 'en')}>
              {<FontAwesomeIcon size="lg" icon={faGlobe} />}
            </button>
            <button onClick={() => setShowInfoModal(true)} className="absolute top-3 left-24  text-orange-500">
              <FontAwesomeIcon size="lg" icon={faFileLines} />
            </button>
            {showLogin && (
              <Link to="/" className="absolute left-32 top-3 ml-2 text-orange-500" icon={faUser}>
                <FontAwesomeIcon size="lg" icon={faUser} />
              </Link>
            )}
          </>
        )}
      </div>
      {showInfoModal && (
        <>
          <div className="fixed inset-x-0 bottom-0 z-10 mt-4 h-screen px-4 pb-6 sm:inset-0 sm:flex sm:items-center sm:justify-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-900 opacity-80"></div>
            </div>
            <div className="scrollbar-black h-full transform overflow-y-scroll rounded-lg bg-gray-700 p-8 text-white shadow-xl transition-all scrollbar-thin  scrollbar-track-gray-600 scrollbar-thumb-orange-600 sm:w-full sm:max-w-lg" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <h3 className="text-lg font-medium"> {texts.projectDocumentation}</h3>
              <p className="mt-4 ">{texts.projectDocs.introduction}</p>
              <p className="mt-4 ">{texts.projectDocs.accessAndAuthorization}</p>
              <h4 className="mt-6 text-lg font-medium"> {texts.features} </h4>
              <p className="mt-4 ">{texts.projectDocs.features}</p>
              <p className="mt-4 ">{texts.projectDocs.SortingOptions}</p>
              <p className="mt-4 ">{texts.projectDocs.MemeGeneration}</p>
              <p className="mt-4 ">{texts.projectDocs.HOC}</p>
              <p className="mt-4 ">{texts.projectDocs.Styling}</p>
              <p className="mt-4 ">{texts.projectDocs.backendDevelopment}</p>
              <p className="mt-4 ">{texts.projectDocs.revenueModel}</p>
              <p className="mt-4 ">{texts.projectDocs.info}</p>
              <button
                className="mt-6 ml-1 rounded border-b-4 border-orange-800 bg-orange-700 px-2 font-bold text-black shadow-lg hover:border-orange-500 hover:bg-orange-400"
                onClick={() => {
                  setShowInfoModal(false);
                }}
              >
                {texts.close}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function NavItem({ to, text, icon }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <Link to={to} className={`rounded-lg p-2 text-white md:mr-5 ${active ? 'rounded border-b-4 border-orange-700 bg-orange-500 text-black' : ''}`}>
      <FontAwesomeIcon className="mr-5" icon={icon} />
      {text}
    </Link>
  );
}

export default withLanguage(Header);
