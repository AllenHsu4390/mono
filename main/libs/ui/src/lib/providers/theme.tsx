import { createTheme } from '@mui/material';
import { Shadows } from '@mui/material/styles/shadows';

const fontFamily = [
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
].join(',');

export const scaleOfBodyFontSize = (scalar: number) => {
  return `clamp(${0.5 * scalar}rem, ${1.5 * scalar}vw, ${1 * scalar}rem)`;
};

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
    fontFamily,
  },
});

export const page = {
  maxWidth: ['100%', '100%', '100%', '90%', '90%'],
};
