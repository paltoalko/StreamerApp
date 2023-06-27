import { createTheme, PaletteMode, responsiveFontSizes } from '@mui/material';

let theme = createTheme({
  palette: {
    mode: 'light' as PaletteMode,
    primary: {
      main: '#351C35',
    },
    secondary: {
      main: '#F0A202',
    },
    background: {
      default: '#26292C',
      paper: '#2F3337',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.54)',
      disabled: 'rgba(255,255,255,0.38)',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

theme = responsiveFontSizes(theme);

export default theme;
