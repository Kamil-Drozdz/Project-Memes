import React, { useContext } from 'react';
import { SubscriptionContext } from '../context/SubscriptionProvider';

const Ads = () => {
  const { subscription } = useContext(SubscriptionContext);

  return <div>{subscription ? '' : <p className="text-2xl">Reklama</p>}</div>;
};

export default Ads;
