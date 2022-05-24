import React, { useContext, useEffect } from 'react';

const positionsMap = new Map<string, { scrollPos: number }>();

const ScrollResetContext =
  React.createContext<Map<string, { scrollPos: number }>>(positionsMap);

interface ScrollResetProviderProps {
  children: React.ReactNode;
}

export const ScrollResetProvider = ({ children }: ScrollResetProviderProps) => {
  return (
    <ScrollResetContext.Provider value={positionsMap}>
      {children}
    </ScrollResetContext.Provider>
  );
};

export const useScrollReset = (key: string) => {
  const pageLookup = useContext(ScrollResetContext);
  if (!pageLookup.has(key)) {
    pageLookup.set(key, {
      scrollPos: 0,
    });
  }

  useEffect(() => {
    const scrollRef = pageLookup.get(key);

    if (!scrollRef) {
      return;
    }

    window.scrollTo(0, scrollRef.scrollPos);

    const handleScrollPos = () => {
      scrollRef.scrollPos = window.scrollY;
    };

    window.addEventListener('scroll', handleScrollPos);
    return () => {
      window.removeEventListener('scroll', handleScrollPos);
    };
  });

  return pageLookup;
};
