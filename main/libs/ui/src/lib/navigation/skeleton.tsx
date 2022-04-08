import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Skeleton, Typography } from '@mui/material';

export default function Navigation() {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        color="transparent"
        sx={{
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            width: ['100%', '100%', '100%', `${theme.breakpoints.values.lg}px`],
            margin: 'auto',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h3" color="text.primary">
              CREATOR NETWORK
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex' }}>
            <Skeleton
              animation="pulse"
              variant="circular"
              sx={{
                width: '40px',
                height: '40px',
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
