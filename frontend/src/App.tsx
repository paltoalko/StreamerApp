import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './assets/theme';
import Main from './components/pages/Main';
import StreamerPage from './components/pages/StreamerPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/streamers/:id" element={<StreamerPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
