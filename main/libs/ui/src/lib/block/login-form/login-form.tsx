import {
  Alert,
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

interface State {
  email: string;
  isLoading: boolean;
  errorMsg: string;
  isReady: boolean;
  isDone: boolean;
}

type Action = {
  type: 'input-changed' | 'loading' | 'error' | 'done' | 'reset';
  email?: string;
  isLoading?: boolean;
  errorMsg?: string;
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
      };
    case 'error':
      return {
        ...state,
        isLoading: false,
        errorMsg: action.errorMsg || '',
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
  });
  const { sendLogin } = useLogin({
    email: state.email,
    onError: (e) => {
      dispatch({
        type: 'error',
        errorMsg: e.message,
      });
    },
  });
  const login = async () => {
    dispatch({ type: 'loading' });
    try {
      const loginResponse = await sendLogin();

      if (loginResponse.magic) {
        dispatch({ type: 'done' });
        console.log(loginResponse.magic);
      }
    } catch (e) {
      dispatch({
        type: 'error',
        errorMsg: e.message,
      });
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
      {state.isDone ? (
        <>
          <Stack
            direction="column"
            spacing={2}
            justifyContent="center"
            sx={{
              mt: '2rem',
            }}
          >
            <Typography>
              Email sent to <b>{state.email}</b>. Click the link in the email to
              continue.
            </Typography>
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
              onClick={() => dispatch({ type: 'reset' })}
              variant="contained"
              sx={{
                minWidth: '6rem',
              }}
            >
              <Typography>Back</Typography>
            </Button>
          </Stack>
        </>
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
          {state.errorMsg ? (
            <Alert
              severity="error"
              sx={{
                mt: '3rem',
              }}
            >
              {state.errorMsg}
            </Alert>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default LoginForm;
