import React, { useState } from 'react';
import FooterWithFab from '../common/HomeFooter';
import TransactionHistoryHeader from '../common/TransactionHistoryHeader';
import { Container } from '@mui/material';
import PeriodTransactions from '../common/PeriodTransactions';
import { PeriodEnum } from '../../types';
import { TransactionFilterProvider } from '../../contexts/TransactionFilterProvider';

const TransactionHistoryPage: React.FC = () => {
  const [period, setPeriod] = useState(PeriodEnum.WEEK);

  const handleChangePeriod = (event: any) => {
    setPeriod(event.target.value);
  };

  return(
    <TransactionFilterProvider>
    <Container sx={{marginTop: '20px'}}>
      <TransactionHistoryHeader period={period} handleChangePeriod={handleChangePeriod}/>
      <PeriodTransactions period={period}/>
      <FooterWithFab/>
    </Container>
    </TransactionFilterProvider>
  )
}

export default TransactionHistoryPage;