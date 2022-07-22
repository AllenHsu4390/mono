import { Container, Typography, useTheme } from '@mui/material';
import { useReducer } from 'react';
import { Wordmark } from '../../element/company/wordmark';
import { useLogin } from '../../hooks/use-login';
import { useSignup } from '../../hooks/use-signup';
import { LoginCreate } from './login-create';
import { reducer } from './login-form-state';
import { LoginStart } from './login-start';
import { LoginWait } from './login-wait';

export const LoginForm = () => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, {
    email: '',
    errorMsg: '',
    isLoading: false,
    isEmailValid: false,
    isDone: false,
    isCreate: false,
  });

  const { sendLogin } = useLogin({
    email: state.email,
    onError: () => dispatch({ type: 'error' }),
  });

  const { sendSignup } = useSignup({
    session: state.session,
    email: state.email,
    onError: () => dispatch({ type: 'error' }),
  });

  const login = async () => {
    dispatch({ type: 'loading' });
    const session = await sendLogin();
    if (session.links.signup) {
      dispatch({ type: 'create', session });
    } else if (session.links.session) {
      dispatch({ type: 'done', session });
    } else {
      dispatch({ type: 'error' });
    }
  };

  const signup = async () => {
    dispatch({ type: 'loading' });
    const session = await sendSignup();
    if (session.links.session) {
      dispatch({ type: 'done', session });
    } else {
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
          onBack={() => dispatch({ type: 'reset' })}
          email={state.email}
        />
      ) : state.isCreate ? (
        <LoginCreate
          isLoading={state.isLoading}
          onSignup={signup}
          onBack={() => dispatch({ type: 'reset' })}
          email={state.email}
        />
      ) : (
        <LoginStart
          isLoading={state.isLoading}
          isEmailValid={state.isEmailValid}
          login={login}
          onEmailChange={(newEmail) => {
            dispatch({ type: 'input-changed', email: newEmail });
          }}
        />
      )}
    </Container>
  );
};
