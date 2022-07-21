import { managedErrorMessages, SessionResponse } from '@main/rest-models';
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
    isReady: false,
    isDone: false,
    isCreate: false,
  });

  const { sendLogin } = useLogin({
    email: state.email,
    onError: (e) => {
      if (e.message === managedErrorMessages.newUserError) {
        dispatch({ type: 'create' });
      } else {
        dispatch({ type: 'error' });
      }
    },
  });

  const { sendSignup } = useSignup({
    email: state.email,
    onError: (e) => {
      dispatch({ type: 'error' });
    },
  });

  const login = async () => {
    dispatch({ type: 'loading' });
    const session = await sendLogin();
    dispatch({ type: 'done', session });
  };

  const signup = async () => {
    dispatch({ type: 'loading' });
    const session = await sendSignup();
    dispatch({ type: 'done', session });
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
        <LoginStart
          isLoading={state.isLoading}
          isReady={state.isReady}
          login={login}
          onEmailChange={(newEmail) => {
            dispatch({ type: 'input-changed', email: newEmail });
          }}
        />
      )}
    </Container>
  );
};
