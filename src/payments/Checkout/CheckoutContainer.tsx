import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { SubscriptionContext } from '../../context/SubscriptionProvider';
import { useAuth } from '../../hooks/useAuth';

import { withLanguage } from '../../HOC/withLanguage';
import Checkout from './Checkout';

export type CheckoutProps = {
  showPayment: boolean;
  handlePayment: () => void;
  onToken: (token: any) => void;
  texts: {
    [key: string]: string;
  };
};

const CheckoutContainer: React.FC<CheckoutProps> = ({ texts }) => {
  const { auth } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const contextValue = useContext(SubscriptionContext);
  if (!contextValue) {
    return null;
  }
  const { setSubscription } = contextValue;

  const handlePayment = () => {
    if (!auth.email) {
      toast.error(`${texts.logInPremium}`, { autoClose: 2000 });
    } else {
      setShowPayment(true);
    }
  };

  const onToken = () => {
    setSubscription(true);
  };

  return <Checkout showPayment={showPayment} handlePayment={handlePayment} onToken={onToken} texts={texts} />;
};

export default withLanguage(CheckoutContainer);
