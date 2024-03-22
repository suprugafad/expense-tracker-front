import React from 'react';
import AccountSummary from '../features/home/AccountSummary';
import { Container } from '@mui/material';
import SpendFrequencyChart from '../features/home/SpendFrequencyChart';
import RecentTransactions from '../features/home/RecentTransactions';
import FooterWithFab from '../components/layout/FooterWithFab/FooterWithFab';

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
