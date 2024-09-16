import { Box, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { TransactionType, UpdatedFieldsInTransaction } from '../types';
import TransactionHeader from '../features/add-transaction/TransactionHeader/TransactionHeader';
import TransactionForm from '../features/add-transaction/TransactionForm/TransactionForm';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TRANSACTION } from '../graphql/mutations/transactionMutations';
import { useNavigate, useParams } from 'react-router-dom';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { GET_ACCOUNT_SUMMARY, GET_AMOUNTS_BY_CATEGORY, GET_EXPENSES_BY_DAY, GET_RECENT_TRANSACTIONS } from '../graphql/queries/homeQueries';
import { GET_TRANSACTION_BY_ID } from '../graphql/queries/transactionQueries';

const EditTransactionPage: React.FC = () => {
  const { id } = useParams();
  const theme = useTheme();
  
  const { data, loading, error } = useQuery(GET_TRANSACTION_BY_ID, { variables: { id } });

  const [amount, setAmount] = useState('');
  const [amountError, setAmountError] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const toLocalISOTimeString = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const offset = date.getTimezoneOffset() * 60000;
    const localDate = new Date(date.getTime() - offset);
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    if (data && data.getTransactionById) {
      setAmount(data.getTransactionById.amount.toString());
      setCategoryId(data.getTransactionById.category.id);
      setDescription(data.getTransactionById.description);
      setDate(toLocalISOTimeString(data.getTransactionById.date));
    }
  }, [data]);
  
  const { openSnackbar } = useContext(SnackbarContext);

  const isExpense = data?.getTransactionById.type === TransactionType.EXPENSES;
  const pageTitle = isExpense ? 'Expense' : 'Income';
  const headerColor = isExpense ? 'error' : 'success';

  const navigate = useNavigate();

  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [
      { query: GET_ACCOUNT_SUMMARY },
      { query: GET_AMOUNTS_BY_CATEGORY, variables: { days: 30, type: data?.getTransactionById.type } },
      { query: GET_EXPENSES_BY_DAY, variables: { days: 7 } },
      { query: GET_RECENT_TRANSACTIONS, variables: { limit: 3 } },
    ],
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!amount) {
      setAmountError('Please, fill in the amount.');
      return;
    }

    const updatedFields: UpdatedFieldsInTransaction = {};
    if (amount !== data.getTransactionById.amount.toString()) {
      updatedFields.amount = parseFloat(amount);
    }
    if (categoryId && categoryId !== data.getTransactionById.category.id) {
      updatedFields.categoryId = categoryId;
    }
    if (description !== data.getTransactionById.description) {
      updatedFields.description = description;
    }
    if (date !== data.getTransactionById.date) {
      updatedFields.date = date;
    }

  if (Object.keys(updatedFields).length === 0) {
    openSnackbar('No changes made to the transaction');
    return;
  }

    try {
      await updateTransaction({
        variables: {
          id: data.getTransactionById.id,
        ...updatedFields,
        }
      });

      navigate('/transaction-history');
      openSnackbar('Transaction was updated')
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

export default EditTransactionPage;