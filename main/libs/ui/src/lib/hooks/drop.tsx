import { Drop } from '@main/models';
import { noop } from 'lodash';
import * as React from 'react';

export const DropContext = React.createContext<
  [Drop, React.Dispatch<React.SetStateAction<Drop>>]
>([{ isDropped: false, assetId: '' }, noop]);

export const useDrop = () => {
  return React.useContext(DropContext);
};

export const DropProvider: React.FC = ({ children }) => {
  const [drop, setDrop] = React.useState<Drop>({
    isDropped: false,
    assetId: '',
  });
  return (
    <DropContext.Provider value={[drop, setDrop]}>
      {children}
    </DropContext.Provider>
  );
};
