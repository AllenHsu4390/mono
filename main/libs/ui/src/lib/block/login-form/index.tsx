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
  password: string;
  isLoading: boolean;
  errorMsg: string;
  isReady: boolean;
}

type Action = {
  type: 'input-changed' | 'loading' | 'error';
  email?: string;
  password?: string;
  isLoading?: boolean;
  errorMsg?: string;
};

const verifiedInput = (state: State, action: Action): State => {
  const email = action.email || state.email;
  const password = action.password || state.password;
  return {
    ...state,
    email,
    password,
    isLoading: false,
    errorMsg: '',
    isReady: email.length >= 3 && password.length >= 8,
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

const LoginForm: React.FC<Props> = ({ loginUrl }) => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    password: '',
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
          password: state.password,
          isLoggedIn: true,
        }),
      });
      if (response.ok) {
        window.location.href = '/';
      }
      if (response.status > 400) {
        throw new Error('Wrong email or password');
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
          onChange={(e) =>
            dispatch({ type: 'input-changed', email: e.currentTarget.value })
          }
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          onChange={(e) =>
            dispatch({ type: 'input-changed', password: e.currentTarget.value })
          }
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
            <Typography>Login</Typography>
          )}
        </Button>
        <Button
          disabled={state.isLoading}
          variant="contained"
          color="secondary"
        >
          <Typography>Sign up</Typography>
        </Button>
      </Stack>
      {state.errorMsg && (
        <Alert
          severity="error"
          sx={{
            mt: '3rem',
          }}
        >
          {state.errorMsg}
        </Alert>
      )}
    </Container>
  );
};

export default LoginForm;
