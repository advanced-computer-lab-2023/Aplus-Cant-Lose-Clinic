import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#004E98', // Button color
    },
    background: {
      default: '#EBEBEB', // Body background
    },
    text: {
      primary: '#444444', // Normal text
      secondary: 'white', // Text on buttons
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    fontSize: 16, // Normal text size
    h4: {
      fontSize: 35, // Headings size
      color: '#200A2A', // Main Headers color
    },
    h6: {
      fontSize: 30, // Sub-headers size
      color: '#3A6EA5', // Sub Headers color
    },
  },
});

export default theme;
