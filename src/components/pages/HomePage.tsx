import React from 'react';
import AccountSummary from '../common/AccountSummary';
import { Container } from '@mui/material';
import SpendFrequencyChart from '../common/SpendFrequencyChart';

const HomePage: React.FC = () => {
  return (
    <Container>
      <AccountSummary />
      <SpendFrequencyChart />
    </Container>
  );
};

export default HomePage;
