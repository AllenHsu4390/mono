import { SessionResponse } from '@main/rest-models';
import { Button, Stack, Typography } from '@mui/material';
import { useSession } from '../../hooks/use-session';

interface Props {
  email: string;
  backClick(): void;
  session: SessionResponse;
}

export const LoginWait = ({ email, backClick, session }: Props) => {
  useSession({
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
