import React, { useState } from 'react';
import FooterWithFab from '../common/FooterWithFab/FooterWithFab';
import TransactionHistoryHeader from '../common/TransactionHistoryHeader';
import { Container } from '@mui/material';
import PeriodTransactions from '../common/PeriodTransactions';
import { PeriodEnum } from '../../types';

const TransactionHistoryPage: React.FC = () => {
  const [period, setPeriod] = useState(PeriodEnum.WEEK);

  const handleChangePeriod = (event: any) => {
    setPeriod(event.target.value);
  };

  return(
    <Container sx={{marginTop: '20px'}}>
      <TransactionHistoryHeader period={period} handleChangePeriod={handleChangePeriod}/>
      <PeriodTransactions period={period}/>
      <FooterWithFab/>
    </Container>
  )
}

export default TransactionHistoryPage;