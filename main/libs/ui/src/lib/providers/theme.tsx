import { createTheme } from '@mui/material';
import { Shadows } from '@mui/material/styles/shadows';

export const theme = createTheme({
  shadows: Array(25).fill('none') as Shadows,
  palette: {
    secondary: {
      light: '#fff',
      main: '#f5f5f5',
      contrastText: '#000000',
    },
    primary: {
      light: '#fff',
      main: '#444',
      contrastText: '#fff',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Rubik',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

theme.typography.h3 = {
  fontSize: '1.2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};
