import React, { useContext } from 'react';
import { SubscriptionContext } from '../../context/SubscriptionProvider';

const Ads = () => {
  const contextValue = useContext(SubscriptionContext);

  if (!contextValue) {
    return null;
  }

  const { subscription } = contextValue;

  return <div>{subscription ? '' : <p className="text-2xl">Reklama</p>}</div>;
};

export default Ads;
