import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer } from 'react-toastify';
import { CheckoutProps } from './CheckoutContainer';

const Checkout: React.FC<CheckoutProps> = ({ showPayment, handlePayment, onToken, texts }) => {
  return (
    <>
      <div>
        {showPayment ? (
          <StripeCheckout cancelable={true} stripeKey="pk_test_51MQlOHCzzlMcK3e31WfjSrnP3jzjxEDc1AgyaJCIWycBQ2ivfAhpgrc82aqjaPBcE0q2xyuMGPIvjwStW1TFkAH800v3jwAKnI" amount={1999} name={`PREMIUM ${texts.subscribe}`} description={texts.subscribeDescription} image="https://i.imgur.com/EHyR2nP.png" panelLabel={texts.subscribe} currency="PLN" locale="auto" token={onToken}>
            <span className="mr-3 -ml-2 cursor-pointer rounded border-b-4 border-red-700 bg-red-600 px-2 pb-2 pt-[10px] font-bold text-black hover:bg-red-500">PREMIUM</span>
          </StripeCheckout>
        ) : (
          <button onClick={handlePayment} className="mr-3 -ml-2 cursor-pointer rounded border-b-4 border-red-700 bg-red-600 px-2 pb-2 pt-[10px] font-bold text-black hover:bg-red-500">
            PREMIUM
          </button>
        )}
      </div>
      <ToastContainer position="bottom-left" hideProgressBar={false} limit={1} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  );
};

export default Checkout;
