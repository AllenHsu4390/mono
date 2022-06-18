import { Button, Stack, Typography } from '@mui/material';

interface Props {
  email: string;
  signupClick(): void;
  backClick(): void;
}

export const LoginCreate = ({ email, signupClick, backClick }: Props) => {
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
          No account found for <b>{email}</b>. Would you like to create one?
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
          sx={{
            minWidth: '6rem',
          }}
        >
          <Typography>Back</Typography>
        </Button>
        <Button
          onClick={signupClick}
          variant="contained"
          sx={{
            minWidth: '6rem',
          }}
        >
          <Typography>Sign up</Typography>
        </Button>
      </Stack>
    </>
  );
};
