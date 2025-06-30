// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // black
      contrastText: '#ffffff', // white text on black
    },
    secondary: {
      main: '#f50057', // you can customize this too
    },
    background: {
      default: '#f9f9f9', // light background
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, sans-serif',
  },
//   shape: {
//     borderRadius: 8,
//   },
});

export default theme;
