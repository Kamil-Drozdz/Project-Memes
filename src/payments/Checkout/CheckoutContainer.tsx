import React from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { withLanguage } from '../../HOC/withLanguage';
import Checkout from './Checkout';
import { setSubscription } from '../../store/subscriptionSlice';
import { RootState } from '../../store/authSlice';

export type CheckoutProps = {
  handlePayment: () => void;
  onToken: (token: any) => void;
  texts: {
    logInPremium: string;
    subscribeDescription: string;
    subscribe: string;
  };
    email: string | null;
};

const CheckoutContainer: React.FC<CheckoutProps> = ({ texts }) => {
  const { email } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handlePayment = () => {
    if (!email) {
      toast.error(`${texts.logInPremium}`, { autoClose: 2000 });
    }
  };

  const onToken = () => {
    dispatch(setSubscription(true));
  };

  return <Checkout email={email} handlePayment={handlePayment} onToken={onToken} texts={texts} />;
};

export default withLanguage(CheckoutContainer);
