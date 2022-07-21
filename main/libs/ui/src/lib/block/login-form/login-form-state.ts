import { SessionResponse } from "@main/rest-models";


interface State {
  email: string;
  isLoading: boolean;
  errorMsg: string;
  isReady: boolean;
  isDone: boolean;
  isCreate: boolean;
  session?: SessionResponse;
}

type Action = {
  type: 'input-changed' | 'loading' | 'error' | 'done' | 'reset' | 'create';
  email?: string;
  isLoading?: boolean;
  errorMsg?: string;
  session?: SessionResponse;
};

const emailIsValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const verifiedInput = (state: State, action: Action): State => {
  const email =
    typeof action.email === 'undefined' ? state.email : action.email;
  return {
    ...state,
    email,
    isLoading: false,
    errorMsg: '',
    isReady: emailIsValid(email),
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'input-changed':
      return verifiedInput(state, action);
    case 'done':
      return {
        ...state,
        isLoading: false,
        isDone: true,
        isCreate: false,
        session: action.session,
      };
    case 'create':
      return {
        ...state,
        isLoading: false,
        isDone: false,
        isCreate: true,
      };
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };

    case 'reset':
      return {
        ...state,
        email: '',
        errorMsg: '',
        isLoading: false,
        isReady: false,
        isDone: false,
        isCreate: false,
        session: undefined,
      };
    case 'error':
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg || '',
        session: undefined,
      };
    default:
      return state;
  }
};