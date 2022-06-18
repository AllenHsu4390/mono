import { LoginResponse } from '@main/rest-models';
import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from '../../hooks/use-router';
import { useSession } from '../../hooks/use-session';

interface Props {
  loginAttempt: LoginResponse;
  email: string;
  backClick(): void;
}

export const LoginWait = ({ loginAttempt, email, backClick }: Props) => {
  const router = useRouter();
  const { session } = useSession({
    loginAttempt,
    refetchInterval: 4000,
  });

  useEffect(() => {
    if (session?.isLoggedIn) {
      router.push('/');
    }
  }, [session, router]);

  return (
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
          Email sent to <b>{email}</b>. Click the link in the email to continue.
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
          onClick={backClick}
          variant="contained"
          sx={{
            minWidth: '6rem',
          }}
        >
          <Typography>Back</Typography>
        </Button>
      </Stack>
    </>
  );
};
