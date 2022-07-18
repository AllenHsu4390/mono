import { AppBar as MuiAppBar, Box, useTheme } from '@mui/material';
import { page } from '../../providers/theme';

interface Props {
  children: React.ReactNode;
  showBottomBorder: boolean;
}

export const AppBar = ({ children, showBottomBorder }: Props) => {
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1, maxWidth: page.maxWidth }}>
      <MuiAppBar
        position="fixed"
        sx={{
          height: '6rem',
          borderBottom: showBottomBorder
            ? `2px solid ${theme.palette.secondary.main}`
            : undefined,
          background: `${theme.palette.background.default}`,
        }}
      >
        {children}
      </MuiAppBar>
    </Box>
  );
};
