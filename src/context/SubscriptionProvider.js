import React, { createContext, useState } from 'react';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState(false);

  return <SubscriptionContext.Provider value={{ subscription, setSubscription }}>{children}</SubscriptionContext.Provider>;
};
