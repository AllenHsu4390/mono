import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Skeleton } from '@mui/material';
import { Title } from './title';
import { AppBar } from './appbar';

export default function Navigation() {
  const theme = useTheme();

  return (
    <AppBar>
      <Toolbar
        sx={{
          width: ['100%', '100%', '100%', `${theme.breakpoints.values.lg}px`],
          margin: 'auto',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Title />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex' }}>
          <Skeleton
            animation="pulse"
            variant="circular"
            sx={{
              width: '2.5rem',
              height: '2.5rem',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
