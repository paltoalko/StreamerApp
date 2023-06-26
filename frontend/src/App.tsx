import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from './assets/theme';
import Main from './components/pages/Main';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
