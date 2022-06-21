import { GuestResponse } from '@main/rest-models';
import React, { createContext, useContext } from 'react';

interface ProviderProps {
  guest: GuestResponse;
  children: React.ReactNode;
}

const GuestContext = createContext<{ guest: GuestResponse | undefined }>({
  guest: undefined,
});

export const GuestProvider = ({ guest, children }: ProviderProps) => {
  return (
    <GuestContext.Provider value={{ guest }}>{children}</GuestContext.Provider>
  );
};

export const useGuest = () => {
  return useContext(GuestContext);
};
