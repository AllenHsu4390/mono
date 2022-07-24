import type { GuestResponse } from '@main/rest-models';
import { atom, useAtom } from 'jotai';

export const guestAtom = atom<GuestResponse | undefined>(undefined);

export const useGuest = () => {
  const [guest] = useAtom(guestAtom);

  return { guest };
};
