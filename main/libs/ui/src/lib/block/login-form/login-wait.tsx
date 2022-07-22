import type { SessionResponse } from '@main/rest-models';
import { Button, Stack, Typography } from '@mui/material';
import { useLoginWait } from '../../hooks/use-login-wait';

interface Props {
  email: string;
  onBack(): void;
  session: SessionResponse;
}

export const LoginWait = ({ email, onBack, session }: Props) => {
  useLoginWait({
    session,
  });

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
          onClick={onBack}
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
