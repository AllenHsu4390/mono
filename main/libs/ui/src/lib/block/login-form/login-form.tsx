import { SessionResponse } from '@main/rest-models';
import { Container, Typography, useTheme } from '@mui/material';
import { useReducer, useState } from 'react';
import { Wordmark } from '../../element/company/wordmark';
import { useLogin } from '../../hooks/use-login';
import { useMultiPage } from '../../hooks/use-multi-page';
import { useSignup } from '../../hooks/use-signup';
import { LoginCreate } from './login-create';
import { reducer } from './login-form-state';
import { LoginStart } from './login-start';
import { LoginWait } from './login-wait';

const emailIsValid = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const LoginForm = () => {
  const theme = useTheme();
  const multiPage = useMultiPage({
    pages: ['login-start', 'login-create', 'login-wait'],
  });
  const [session, setSession] = useState<SessionResponse>();
  const [email, setEmail] = useState('');

  const { sendLogin } = useLogin({
    email,
    onError: () => multiPage.error(),
  });

  const { sendSignup } = useSignup({
    session,
    email,
    onError: () => multiPage.error(),
  });

  const login = async () => {
    multiPage.loading();
    const newSession = await sendLogin();
    if (newSession.links.signup) {
      multiPage.page('login-create');
      setSession(newSession);
    } else if (newSession.links.wait) {
      multiPage.page('login-wait');
      setSession(newSession);
    } else {
      multiPage.error();
    }
  };

  const signup = async () => {
    multiPage.loading();
    const newSession = await sendSignup();
    if (newSession.links.wait) {
      setSession(newSession);
      multiPage.page('login-wait');
    } else {
      multiPage.error();
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
      {multiPage.state.currentPage === 'login-wait' && session ? (
        <LoginWait session={session} email={email} onBack={multiPage.reset} />
      ) : multiPage.state.currentPage === 'login-create' ? (
        <LoginCreate
          isLoading={multiPage.state.isLoading}
          onSignup={signup}
          onBack={multiPage.reset}
          email={email}
        />
      ) : multiPage.state.currentPage === 'login-start' ? (
        <LoginStart
          isLoading={multiPage.state.isLoading}
          isEmailValid={emailIsValid(email)}
          login={login}
          onEmailChange={(newEmail) => {
            setEmail(newEmail);
          }}
        />
      ) : (
        <>Something went wrong</>
      )}
    </Container>
  );
};
