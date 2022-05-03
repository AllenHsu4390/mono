import { AppBar as MuiAppBar, Box, useTheme } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export const AppBar = ({ children }: Props) => {
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
