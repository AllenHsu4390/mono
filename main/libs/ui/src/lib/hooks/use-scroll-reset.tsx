import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const positionsMapAtom = atom<Map<string, { scrollPos: number }>>(
  new Map<string, { scrollPos: number }>()
);

export const useScrollReset = (key: string) => {
  const [pageLookup] = useAtom(positionsMapAtom);
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
