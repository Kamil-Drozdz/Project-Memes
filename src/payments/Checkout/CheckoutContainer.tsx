import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { SubscriptionContext } from '../../context/SubscriptionProvider';
import { useAuth } from '../../hooks/useAuth';
import { withLanguage } from '../../HOC/withLanguage';
import Checkout from './Checkout';

export type CheckoutProps = {
  handlePayment: () => void;
  onToken: (token: any) => void;
  texts: {
    logInPremium: string;
  };
  auth: {
    email: string | null;
  };
};

const CheckoutContainer: React.FC<CheckoutProps> = ({ texts }) => {
  const { auth } = useAuth();
  const contextValue = useContext(SubscriptionContext);

  if (!contextValue) {
    return null;
  }
  const { setSubscription } = contextValue;

  const handlePayment = () => {
    if (!auth.email) {
      toast.error(`${texts.logInPremium}`, { autoClose: 2000 });
    }
  };

  const onToken = () => {
    setSubscription(true);
  };

  return <Checkout auth={auth} handlePayment={handlePayment} onToken={onToken} texts={texts} />;
};

export default withLanguage(CheckoutContainer);
