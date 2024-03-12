import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import OnboardingScreen from './components/pages/OnboardingScreen';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import HomePage from './components/pages/HomePage';
import TransactionPage from './components/pages/TransactionPage';
import { TransactionType } from './types';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<OnboardingScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/transaction/income" element={<TransactionPage transactionType={TransactionType.INCOME} />} />
          <Route path="/transaction/expense" element={<TransactionPage transactionType={TransactionType.EXPENSES} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;