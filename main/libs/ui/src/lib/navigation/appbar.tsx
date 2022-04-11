import { AppBar as MuiAppBar, Box, useTheme } from '@mui/material';
import { HideOnScroll } from './scroll';

export const AppBar: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll>
        <MuiAppBar
          position="fixed"
          sx={{
            boxShadow: 'none',
            height: '6rem',
            background: `${theme.palette.background.default}`,
          }}
        >
          {children}
        </MuiAppBar>
      </HideOnScroll>
    </Box>
  );
};
