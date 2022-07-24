import { DropResponse } from '@main/rest-models';
import { atom, useAtom } from 'jotai';

const dropAtom = atom<DropResponse>({
  isDropped: false,
  assetId: '',
});

export const useDrop = () => {
  return useAtom(dropAtom);
};
