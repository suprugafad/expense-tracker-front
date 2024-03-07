import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import OnboardingScreen from './components/OnboardingScreen';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This is MUI's CSS reset */}
      <OnboardingScreen />
    </ThemeProvider>
  );
};

export default App;