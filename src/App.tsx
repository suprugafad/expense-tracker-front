import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import OnboardingScreen from './pages/OnboardingScreen';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/TransactionPage';
import { TransactionType } from './types';
import { SnackbarProvider } from './contexts/SnackbarProvider';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import { TransactionFilterProvider } from './contexts/TransactionFilterProvider';
import FinancialReportPage from './pages/FinancialReportPage';
import SignUpPage from './pages/SignUpPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <TransactionFilterProvider>
          <Router>
            <Routes>
              <Route path="/" element={<OnboardingScreen />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/transaction/income" element={<TransactionPage transactionType={TransactionType.INCOME} />} />
              <Route path="/transaction/expense" element={<TransactionPage transactionType={TransactionType.EXPENSES} />} />
              <Route path="/transaction-history" element={<TransactionHistoryPage/>} />
              <Route path="/financial-report" element={<FinancialReportPage/>} />
            </Routes>
          </Router>
        </TransactionFilterProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;