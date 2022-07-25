import { atom, useAtom } from 'jotai';

const isLoadingAtom = atom(false);

export const useGlobalLoading = () => {
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  return {
    isLoading,
    startLoading: () => setIsLoading(true),
    stopLoading: () => setIsLoading(false),
  };
};
