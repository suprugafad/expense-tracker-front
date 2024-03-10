import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#7A41FA',
    },
    secondary: {
      main: '#19857B',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;