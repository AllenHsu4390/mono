import type { SessionResponse } from '@main/rest-models';
import {
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useReducer } from 'react';
import { Wordmark } from '../../element/company/wordmark';
import { useLogin } from '../../hooks/use-login';
import { useSignup } from '../../hooks/use-signup';
import { LoginCreate } from './login-create';
import { LoginWait } from './login-wait';

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

const reducer = (state: State, action: Action): State => {
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

const LoginForm = () => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    errorMsg: '',
    isLoading: false,
    isReady: false,
    isDone: false,
    isCreate: false,
  });
  const { sendLogin } = useLogin({
    email: state.email,
    onError: (e) => {
      dispatch({ type: 'create' });
    },
  });

  const { sendSignup } = useSignup({
    email: state.email,
  });

  const login = async () => {
    dispatch({ type: 'loading' });
    try {
      const session = await sendLogin();

      dispatch({ type: 'done', session });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'create' });
    }
  };

  const signup = async () => {
    dispatch({ type: 'loading' });
    try {
      const session = await sendSignup();
      dispatch({ type: 'done', session });
    } catch (e) {
      dispatch({ type: 'error' });
    }
  };

  return (
    <Container
      sx={{
        pt: '10rem',
        width: theme.breakpoints.values.sm,
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      }}
    >
      <Typography
        variant="h3"
        color="text.primary"
        sx={{
          textAlign: 'center',
        }}
      >
        <Wordmark />
      </Typography>
      {state.isDone && state.session ? (
        <LoginWait
          session={state.session}
          backClick={() => dispatch({ type: 'reset' })}
          email={state.email}
        />
      ) : state.isCreate ? (
        <LoginCreate
          signupClick={signup}
          backClick={() => dispatch({ type: 'reset' })}
          email={state.email}
        />
      ) : (
        <>
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            sx={{
              mt: '2rem',
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              onChange={(e) =>
                dispatch({
                  type: 'input-changed',
                  email: e.target.value,
                })
              }
              onKeyUp={(e) => e.key === 'Enter' && login()}
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{
              mt: '3rem',
            }}
          >
            <Button
              disabled={state.isLoading || !state.isReady}
              onClick={login}
              variant="contained"
              sx={{
                minWidth: '6rem',
              }}
            >
              {state.isLoading ? (
                <CircularProgress size={'1rem'} />
              ) : (
                <Typography>Continue</Typography>
              )}
            </Button>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default LoginForm;
