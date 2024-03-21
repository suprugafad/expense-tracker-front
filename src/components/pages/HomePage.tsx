import React from 'react';
import AccountSummary from '../common/AccountSummary';
import { Container } from '@mui/material';
import SpendFrequencyChart from '../common/SpendFrequencyChart';
import RecentTransactions from '../common/RecentTransactions';
import FooterWithFab from '../common/FooterWithFab/FooterWithFab';

const HomePage: React.FC = () => {
  return (
    <Container>
      <AccountSummary />
      <SpendFrequencyChart />
      <RecentTransactions />
      <FooterWithFab />
    </Container>
  );
};

export default HomePage;
