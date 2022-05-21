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

interface State {
  email: string;
  isLoading: boolean;
  errorMsg: string;
  isReady: boolean;
}

type Action = {
  type: 'input-changed' | 'loading' | 'error';
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
    case 'loading':
      return {
        ...state,
        isLoading: true,
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

interface Props {
  loginUrl: string;
}

const LoginForm = ({ loginUrl }: Props) => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    errorMsg: '',
    isLoading: false,
    isReady: false,
  });
  const login = async () => {
    dispatch({ type: 'loading' });
    try {
      const response = await fetch(loginUrl, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify({
          email: state.email,
        }),
      });

      const loginResponse = await response.json();

      if (loginResponse.magic) {
        console.log(loginResponse.magic);
      }
      if (loginResponse.status > 400) {
        throw new Error('Wrong email');
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
      ) : !state.isLoading && state.isReady ? (
        <Alert
          severity="info"
          sx={{
            mt: '3rem',
          }}
        >
          We use passwordless login. With just an email address you are ready to
          go.
        </Alert>
      ) : null}
    </Container>
  );
};

export default LoginForm;
