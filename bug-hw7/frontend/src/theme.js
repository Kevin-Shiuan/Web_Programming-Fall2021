import { createTheme } from '@material-ui/core/styles';

export const Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#344955',
      light: '#4a6572',
      dark: '#232F34',
    },
    secondary: {
      main: '#F9AA33',
      light: '#F9AA33',
      dark: '#F9AA33',
    },
    background: {
      default: '#f1f3f5',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#343a40',
    },
    success: {
      main: '#0ca678',
    },
    error: {
      main: '#f03e3e',
    },
    info: {
      main: '#1c7ed6',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
  },
  overrides: {
    MuiAppBar: {
      colorInherit: {
        backgroundColor: '#689f38',
        color: '#fff',
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});