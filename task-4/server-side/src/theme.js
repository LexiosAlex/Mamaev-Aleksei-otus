import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      light: "#b6ca97",
      main: "#689522",
      dark: "#5e8454",
      contrastText: "#e7ebe1",
      black: "#323232"
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});