import { useContext, useState, useEffect } from 'react';
import { SubscriptionContext } from '../../context/SubscriptionProvider';
import AdsMockup from '../../assets/AdsMockup.png';
import AdsMockupMobile from '../../assets/AdsMockupMobile.png';

const Ads = () => {
  const contextValue = useContext(SubscriptionContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!contextValue) {
    return null;
  }

  const { subscription } = contextValue;
  const isMobile = windowWidth <= 768;

  return <div className="flex justify-center">{subscription ? '' : <img className=" w-full md:w-1/2 xl:w-3/4 2xl:w-full flex justify-center items-center object-fit" src={isMobile ? AdsMockupMobile : AdsMockup} />}</div>;
};

export default Ads;
