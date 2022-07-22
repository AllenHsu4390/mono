import { Button, CircularProgress, Stack, Typography } from '@mui/material';

interface Props {
  isLoading: boolean;
  email: string;
  onBack(): void;
  onSignup(): void;
}

export const LoginCreate = ({ email, isLoading, onBack, onSignup }: Props) => (
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
        onClick={onBack}
        sx={{
          minWidth: '6rem',
        }}
      >
        <Typography>Back</Typography>
      </Button>
      <Button
        disabled={isLoading}
        onClick={onSignup}
        variant="contained"
        sx={{
          minWidth: '6rem',
        }}
      >
        {isLoading ? (
          <CircularProgress size={'1rem'} />
        ) : (
          <Typography>Sign up</Typography>
        )}
      </Button>
    </Stack>
  </>
);
