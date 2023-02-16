import React, { useContext, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { SubscriptionContext } from '../context/SubscriptionProvider';
import { useAuth } from '../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import { withLanguage } from '../components/HOC/withLanguage';

const Checkout = ({ texts }) => {
  const { setSubscription } = useContext(SubscriptionContext);
  const { auth } = useAuth();
  const [showPayment, setShowPayment] = useState(false);

  const handlePayment = () => {
    if (!auth.email) {
      toast.error(`${texts.logInPremium}`, { autoClose: 2000 });
    } else {
      setShowPayment(true);
    }
  };

  const onToken = (token) => {
    // Wywoływane po poprawnej płatności.

    setSubscription(true);
  };

  return (
    <>
      <div>
        {showPayment ? (
          <StripeCheckout
            cancelable={true}
            stripeKey="pk_test_51MQlOHCzzlMcK3e31WfjSrnP3jzjxEDc1AgyaJCIWycBQ2ivfAhpgrc82aqjaPBcE0q2xyuMGPIvjwStW1TFkAH800v3jwAKnI"
            amount={1999}
            name="Subkrypcja premium"
            description="Subskrypcja"
            image="https://i.imgur.com/EHyR2nP.png"
            panelLabel="Subskrybuj"
            currency="PLN"
            locale="pl"
            label="Subskrybuj"
            token={onToken} // Dodane wywołanie funkcji onToken po poprawnej płatności.
          >
            <span className="mr-3 -ml-2 cursor-pointer rounded border-b-4 border-red-700 bg-red-600 p-2 font-bold text-black hover:bg-red-500">PREMIUM</span>
          </StripeCheckout>
        ) : (
          <button onClick={handlePayment} className="mr-3 -ml-2 cursor-pointer rounded border-b-4 border-red-700 bg-red-600 p-2 font-bold text-black hover:bg-red-500">
            PREMIUM
          </button>
        )}
      </div>
      <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  );
};

export default withLanguage(Checkout);
