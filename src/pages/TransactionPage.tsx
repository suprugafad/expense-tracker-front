import { Box, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import { TransactionType } from '../types';
import TransactionHeader from '../features/add-transaction/TransactionHeader';
import TransactionForm from '../features/add-transaction/TransactionForm';
import { useMutation } from '@apollo/client';
import { ADD_TRANSACTION } from '../graphql/mutations/transactionMutations';
import { useNavigate } from 'react-router-dom';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { GET_ACCOUNT_SUMMARY, GET_EXPENSES_BY_DAY, GET_RECENT_TRANSACTIONS } from '../graphql/queries/homeQueries';

const TransactionPage: React.FC<{ transactionType: TransactionType }> = ({ transactionType }) => {
  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().substring(0, 16));
  
  const { openSnackbar } = useContext(SnackbarContext);

  const isExpense = transactionType === TransactionType.EXPENSES;
  const pageTitle = isExpense ? 'Expense' : 'Income';
  const headerColor = isExpense ? 'error' : 'success';

  const navigate = useNavigate();

  const [addTransaction] = useMutation(ADD_TRANSACTION, {
    refetchQueries: [
      { query: GET_ACCOUNT_SUMMARY },
      { query: GET_EXPENSES_BY_DAY, variables: { days: 7 } },
      { query: GET_RECENT_TRANSACTIONS, variables: { limit: 3 } },
    ],
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!amount) {
      setAmountError('Please, fill in the amount.');
      return;
    }

    try {
      await addTransaction({
        variables: {
          amount: parseFloat(amount),
          type: transactionType,
          categoryId,
          description,
          date
        }
      });

      navigate('/home');
      openSnackbar('Transaction was added')
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setAmount(event.target.value);

    if (event.target.value) {
      setAmountError('');
    }
  };

  const handleCategoryChange = (event: any) => {    
    setCategoryId(event.target.value);
  };

  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setDate(event.target.value);
  };

  const theme = useTheme();
  const backgroundColor = theme.palette[headerColor].main;

  return (
    <Box sx={{backgroundColor}}>
      <TransactionHeader 
        pageTitle={pageTitle} 
        amount={amount} 
        amountError={amountError} 
        handleAmountChange={handleAmountChange}/>
      <TransactionForm 
        handleSubmit={handleSubmit} 
        categoryId={categoryId} 
        description={description} 
        date={date} 
        handleCategoryIdChange={handleCategoryChange} 
        handleDescriptionChange={handleDescriptionChange} 
        handleDateChange={handleDateChange}/>
    </Box>
  );
};

export default TransactionPage;