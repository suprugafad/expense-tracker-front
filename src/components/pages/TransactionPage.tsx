import { Box, useTheme } from '@mui/material';
import React from 'react';
import { TransactionType } from '../../types';
import TransactionHeader from '../common/TransactionHeader';
import TransactionForm from '../common/TransactionForm';

const TransactionPage: React.FC<{ transactionType: TransactionType }> = ({ transactionType }) => {
  const isExpense = transactionType === TransactionType.EXPENSES;
  const pageTitle = isExpense ? 'Expense' : 'Income';
  const headerColor = isExpense ? 'error' : 'success';


  const theme = useTheme();
  const backgroundColor = theme.palette[headerColor].main;
  
  const onSubmit = () => {

  }

  return (
    <Box sx={{backgroundColor}}>
      <TransactionHeader pageTitle={pageTitle} headerColor={headerColor}/>
      <TransactionForm onSubmit={onSubmit}/>
    </Box>
  );
};

export default TransactionPage;