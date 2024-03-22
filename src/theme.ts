import { createTheme } from '@mui/material/styles';

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
      main: '#fc3c4c',
    },
    success: {
      main: '#04ac74'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        },
      },
    },
  },
});

export default theme;