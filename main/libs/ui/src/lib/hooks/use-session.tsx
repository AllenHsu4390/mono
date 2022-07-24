import { SessionResponse } from '@main/rest-models';
import { atom, useAtom } from 'jotai';

const sessionAtom = atom<SessionResponse | undefined>(undefined);

export const useSession = () => {
  return useAtom(sessionAtom);
};
