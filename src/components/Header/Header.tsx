import { Link } from 'react-router-dom';
import { Spin as Hamburger } from 'hamburger-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faRandom, faSortAmountAsc, faGlobe, faUser, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { BiQr } from 'react-icons/bi';
import Checkout from '../../payments/Checkout/CheckoutContainer';
import QRCodeContainer from '../QRCode/QRCodeContainer';
import Modal from './Modal';
import { NavItemContainer } from './NavItemContainer';
import { HeaderContainerProps } from './HeaderContainer';

const Header: React.FC<HeaderContainerProps> = ({ texts, isOpen, setOpen, language, setLanguage, subscription, showQRCode, setShowQRCode, showLogin, showInfoModal, setShowInfoModal, auth, pingModal, setPingModal }) => {
  return (
    <>
      <nav className="mx-auto hidden items-center justify-between bg-gray-800 md:flex md:flex-row md:items-center md:justify-start">
        <div className="flex flex-1 items-center">
          <Link to="/">
            <p className="ml-4 text-white">
              <strong className="text-2xl">Memes</strong>
              <br /> alpha version
            </p>
          </Link>
          <button
            className="relative ml-4 rounded-lg bg-black p-1 text-white "
            onClick={() => {
              setShowInfoModal(true);
              setPingModal(false);
            }}
          >
            Docs
            {pingModal && (
              <>
                <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 animate-ping rounded-full bg-orange-400 opacity-75"></span>
                <span className="absolute -top-1 -right-1 inline-flex h-3 w-3  rounded-full bg-orange-500"></span>
              </>
            )}
          </button>
          <button className="ml-20 hidden md:flex" onClick={() => setShowQRCode(!showQRCode)}>
            {<BiQr className="text-2xl text-orange-600" />}
            {showQRCode && <QRCodeContainer />}
          </button>
        </div>
        <NavItemContainer to="/" text={texts.browse} icon={faRandom} />
        <NavItemContainer to="/sort" text={texts.sortMemes} icon={faSortAmountAsc} />
        <NavItemContainer to="/generatemem" text={texts.generateMeme} icon={faPlusSquare} />
        {showLogin ? (
          <NavItemContainer to="/login" text={texts.logIn} icon={faUser} />
        ) : (
          <p title="kliknij by przenieść się do panelu użytkownika" className=" absolute left-[25%] text-white">
            <Link to="/userpanel">
              {texts.hi}, {auth?.userNick}
            </Link>
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
                <NavItemContainer to="/" text={texts.browse} icon={faRandom} />
                <NavItemContainer to="/sort" text={texts.sortMemes} icon={faSortAmountAsc} />
                <NavItemContainer to="/generatemem" text={texts.generateMeme} icon={faPlusSquare} />
              </div>
            </header>
            <button className=" absolute top-3 left-14 text-orange-500" onClick={() => setLanguage(language === 'en' ? 'pl' : 'en')}>
              {<FontAwesomeIcon size="lg" icon={faGlobe} />}
            </button>
            <button
              onClick={() => {
                setShowInfoModal(true);
                setPingModal(false);
              }}
              className="absolute top-3 left-24  text-orange-500"
            >
              <FontAwesomeIcon size="lg" icon={faFileLines} />
              {pingModal && (
                <>
                  <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 animate-ping rounded-full bg-sky-400 opacity-75"></span>
                  <span className="absolute -top-1 -right-1 inline-flex h-3 w-3  rounded-full bg-sky-500"></span>
                </>
              )}
            </button>
            {showLogin && (
              <Link to="/" className="absolute left-32 top-3 ml-2 text-orange-500">
                <FontAwesomeIcon size="lg" icon={faUser} />
              </Link>
            )}
          </>
        )}
      </div>
      {showInfoModal && <Modal setShowInfoModal={setShowInfoModal} texts={texts} />}
    </>
  );
};

export default Header;
