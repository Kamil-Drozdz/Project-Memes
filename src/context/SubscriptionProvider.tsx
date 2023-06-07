import React, { ReactNode, createContext, useState } from 'react';

export interface SubscriptionContextType {
  subscription: boolean;
  setSubscription: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);
interface SubscriptionProviderProps {
  children: ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({ children }) => {
  const [subscription, setSubscription] = useState(false);

  return <SubscriptionContext.Provider value={{ subscription, setSubscription }}>{children}</SubscriptionContext.Provider>;
};
