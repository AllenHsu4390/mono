import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

interface Props {
  isLoading: boolean;
  isEmailValid: boolean;
  login(): void;
  onEmailChange(email: string): void;
}

export const LoginStart = ({
  isLoading,
  isEmailValid,
  login,
  onEmailChange,
}: Props) => (
  <>
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
        onChange={(e) => onEmailChange(e.target.value)}
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
        disabled={isLoading || !isEmailValid}
        onClick={login}
        variant="contained"
        sx={{
          minWidth: '6rem',
        }}
      >
        {isLoading ? (
          <CircularProgress size={'1rem'} />
        ) : (
          <Typography>Continue</Typography>
        )}
      </Button>
    </Stack>
  </>
);
