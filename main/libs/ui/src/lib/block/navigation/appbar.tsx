import { AppBar as MuiAppBar, Box, useTheme } from '@mui/material';

export const AppBar: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar
        position="fixed"
        sx={{
          boxShadow: 'none',
          height: '6rem',
          borderBottom: `2px solid ${theme.palette.secondary.main}`,
          background: `${theme.palette.background.default}`,
        }}
      >
        {children}
      </MuiAppBar>
    </Box>
  );
};
