import React from 'react';
import AccountSummary from '../common/AccountSummary';
import { Container } from '@mui/material';
import SpendFrequencyChart from '../common/SpendFrequencyChart';
import RecentTransactions from '../common/RecentTransactions';

const HomePage: React.FC = () => {
  return (
    <Container>
      <AccountSummary />
      <SpendFrequencyChart />
      <RecentTransactions />
    </Container>
  );
};

export default HomePage;
