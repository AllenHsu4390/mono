import { useReducer } from 'react';

interface State {
  isOpen: boolean;
  isLocked: boolean;
  isConfirmed?: boolean;
}

interface Action {
  type: 'open' | 'close' | 'confirm' | 'cancel';
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        isOpen: true,
        isLocked: false,
        isConfirmed: false,
      };
    case 'confirm':
      return {
        ...state,
        isOpen: true,
        isConfirmed: true,
        isLocked: true,
      };
    case 'cancel':
    case 'close':
      return {
        ...state,
        isOpen: false,
        isLocked: true,
      };
    default:
      return state;
  }
};

export const useConfirmDialog = () => {
  const [state, dispatch] = useReducer(reducer, {
    isOpen: false,
    isLocked: false,
    isConfirmed: false,
  });

  return {
    state,
    open: () => dispatch({ type: 'open' }),
    close: () => dispatch({ type: 'close' }),
    cancel: () => dispatch({ type: 'cancel' }),
    confirm: () => dispatch({ type: 'confirm' }),
  };
};
