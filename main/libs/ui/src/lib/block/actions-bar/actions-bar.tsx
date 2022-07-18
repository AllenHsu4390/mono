import { Container, Paper, useTheme } from '@mui/material';
import { page } from '../../providers/theme';

interface Props {
  children: React.ReactNode;
}

export const ActionsBar = ({ children }: Props) => {
  const theme = useTheme();
  return (
    <Paper
      sx={{
        borderRadius: 0,
        width: '100vw',
        pb: '1rem',
        pt: '1rem',
        position: 'fixed',
        zIndex: 2,
        top: '6rem',
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
      }}
    >
      <Container
        sx={{
          maxWidth: page.maxWidth,
        }}
      >
        {children}
      </Container>
    </Paper>
  );
};
